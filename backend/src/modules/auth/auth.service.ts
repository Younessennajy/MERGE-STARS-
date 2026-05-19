import {
  ConflictException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';
import { Response } from 'express';
import { LessThan, Repository } from 'typeorm';
import { Role } from '../../common/enums/role.enum';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { SetupAdminDto } from './dto/setup-admin.dto';
import { RefreshToken } from './entities/refresh-token.entity';
import { JwtPayload } from './interfaces/jwt-payload.interface';

const BCRYPT_ROUNDS = 12;
const REFRESH_COOKIE_NAME = 'refresh_token';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepo: Repository<RefreshToken>,
  ) {}

  // ─── One-time admin setup ─────────────────────────────────────────────────────

  async setupAdmin(dto: SetupAdminDto) {
    const existingAdmin = await this.usersService.findByEmail(dto.email);
    if (existingAdmin) {
      throw new ConflictException(
        'Setup already completed: an admin account already exists. This endpoint is disabled.',
      );
    }

    // Check if ANY admin already exists in the system
    const anyAdmin = await this.usersService.findAnyAdmin();
    if (anyAdmin) {
      throw new ConflictException(
        'Setup already completed: an admin account already exists. This endpoint is disabled.',
      );
    }

    const passwordHash = await bcrypt.hash(dto.password, BCRYPT_ROUNDS);

    const admin = await this.usersService.create({
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email,
      phone: null,
      personalId: dto.personalId,
      passwordHash,
      roles: [Role.Admin],
      isVerified: true,
      region: 'geo',
    });

    this.logger.log(`First admin account created: ${admin.email} [${admin.id}]`);

    return {
      message: 'Admin account created successfully. This endpoint is now permanently disabled.',
      admin: {
        id: admin.id,
        email: admin.email,
        roles: admin.roles,
      },
    };
  }

  // ─── Register ────────────────────────────────────────────────────────────────

  async register(dto: RegisterDto) {
    if (!dto.email && !dto.phone) {
      throw new ConflictException(
        'Registration failed: at least one of email or phone is required.',
      );
    }

    if (dto.email) {
      const existing = await this.usersService.findByEmail(dto.email);
      if (existing) {
        throw new ConflictException(
          `Registration failed: the email "${dto.email}" is already associated with an account.`,
        );
      }
    }

    const existingById = await this.usersService.findByPersonalId(
      dto.personalId,
    );
    if (existingById) {
      throw new ConflictException(
        `Registration failed: the personal ID "${dto.personalId}" is already registered.`,
      );
    }

    const passwordHash = await bcrypt.hash(dto.password, BCRYPT_ROUNDS);

    const user = await this.usersService.create({
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email ?? null,
      phone: dto.phone ?? null,
      personalId: dto.personalId,
      passwordHash,
      roles: [Role.User],
      region: dto.region ?? 'geo',
    });

    this.logger.log(`New user registered: ${user.email ?? user.phone} [${user.id}]`);

    return {
      message: 'Account created successfully.',
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        roles: user.roles,
      },
    };
  }

  // ─── Login ───────────────────────────────────────────────────────────────────

  async login(dto: LoginDto, res: Response) {
    const user = await this.usersService.findByEmail(dto.login);

    if (!user) {
      throw new UnauthorizedException(
        'Login failed: no account found with this email.',
      );
    }

    const passwordMatch = await bcrypt.compare(dto.password, user.passwordHash);
    if (!passwordMatch) {
      throw new UnauthorizedException(
        'Login failed: incorrect password.',
      );
    }

    const payload: JwtPayload = {
      sub: user.id,
      roles: user.roles,
      region: user.region,
    };

    const familyId = randomUUID();
    const { accessToken, refreshToken } = await this.issueTokenPair(
      payload,
      familyId,
    );

    this.setRefreshCookie(res, refreshToken);
    this.logger.log(`User logged in: ${user.email} [${user.id}] roles=${user.roles}`);

    return {
      message: 'Login successful.',
      accessToken,
      expiresIn: this.config.get<string>('jwt.expiresIn'),
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        roles: user.roles,
        region: user.region,
      },
    };
  }

  // ─── Refresh ─────────────────────────────────────────────────────────────────

  async refresh(userId: string, rawRefreshToken: string, res: Response) {
    const tokenRecord = await this.refreshTokenRepo.findOne({
      where: { userId, isRevoked: false },
      order: { createdAt: 'DESC' },
    });

    if (!tokenRecord) {
      throw new UnauthorizedException(
        'Session expired: no active session found. Please log in again.',
      );
    }

    const tokenValid = await bcrypt.compare(
      rawRefreshToken,
      tokenRecord.tokenHash,
    );

    if (!tokenValid) {
      await this.revokeFamily(tokenRecord.familyId);
      this.logger.warn(
        `Security alert: refresh token reuse detected for user ${userId}. ` +
        `Family ${tokenRecord.familyId} fully revoked.`,
      );
      throw new UnauthorizedException(
        'Security alert: invalid refresh token detected. ' +
        'All sessions have been terminated. Please log in again.',
      );
    }

    if (new Date() > tokenRecord.expiresAt) {
      await this.revokeTokenById(tokenRecord.id);
      throw new UnauthorizedException(
        'Session expired: your refresh token has expired. Please log in again.',
      );
    }

    await this.revokeTokenById(tokenRecord.id);

    const user = await this.usersService.findById(userId);
    const payload: JwtPayload = {
      sub: user.id,
      roles: user.roles,
      region: user.region,
    };

    const { accessToken, refreshToken } = await this.issueTokenPair(
      payload,
      tokenRecord.familyId,
    );

    this.setRefreshCookie(res, refreshToken);

    return {
      message: 'Token refreshed successfully.',
      accessToken,
      expiresIn: this.config.get<string>('jwt.expiresIn'),
    };
  }

  // ─── Logout ──────────────────────────────────────────────────────────────────

  async logout(userId: string, res: Response) {
    const result = await this.refreshTokenRepo.update(
      { userId, isRevoked: false },
      { isRevoked: true },
    );

    res.clearCookie(REFRESH_COOKIE_NAME, { path: '/api/auth' });
    this.logger.log(`User logged out: [${userId}] — ${result.affected ?? 0} session(s) revoked.`);

    return {
      message: 'Logged out successfully. All sessions have been terminated.',
      sessionsRevoked: result.affected ?? 0,
    };
  }

  // ─── Internal helpers ─────────────────────────────────────────────────────────

  private async issueTokenPair(payload: JwtPayload, familyId: string) {
    const accessToken = this.jwtService.sign(payload, {
      secret: this.config.get<string>('jwt.secret'),
      expiresIn: this.config.get('jwt.expiresIn') as unknown as number,
    });

    const refreshExpiresIn = this.config.get<string>('jwt.refreshExpiresIn')!;
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.config.get<string>('jwt.refreshSecret'),
      expiresIn: refreshExpiresIn as unknown as number,
    });

    const tokenHash = await bcrypt.hash(refreshToken, BCRYPT_ROUNDS);
    const expiresAt = this.parseExpiresIn(refreshExpiresIn);

    await this.refreshTokenRepo.save(
      this.refreshTokenRepo.create({
        userId: payload.sub,
        tokenHash,
        familyId,
        expiresAt,
        isRevoked: false,
      }),
    );

    return { accessToken, refreshToken };
  }

  private setRefreshCookie(res: Response, token: string): void {
    const maxAge = 7 * 24 * 60 * 60 * 1000;
    res.cookie(REFRESH_COOKIE_NAME, token, {
      httpOnly: true,
      secure: this.config.get<string>('app.nodeEnv') === 'production',
      sameSite: 'strict',
      maxAge,
      path: '/api/auth',
    });
  }

  private async revokeTokenById(id: string): Promise<void> {
    await this.refreshTokenRepo.update({ id }, { isRevoked: true });
  }

  private async revokeFamily(familyId: string): Promise<void> {
    await this.refreshTokenRepo.update({ familyId }, { isRevoked: true });
  }

  private parseExpiresIn(expiresIn: string): Date {
    const units: Record<string, number> = {
      s: 1_000,
      m: 60_000,
      h: 3_600_000,
      d: 86_400_000,
    };
    const match = expiresIn.match(/^(\d+)([smhd])$/);
    if (!match) throw new Error(`Invalid expiresIn format: ${expiresIn}`);
    const ms = parseInt(match[1], 10) * units[match[2]];
    return new Date(Date.now() + ms);
  }

  async purgeExpiredTokens(): Promise<void> {
    await this.refreshTokenRepo.delete({ expiresAt: LessThan(new Date()) });
  }
}
