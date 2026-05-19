import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { Role } from '../../common/enums/role.enum';
import { User } from '../users/entities/user.entity';
import { AssignRolesDto } from './dto/assign-roles.dto';
import { ChangeUserEmailDto } from './dto/change-user-email.dto';
import { ChangeUserPasswordDto } from './dto/change-user-password.dto';

const BCRYPT_ROUNDS = 12;

@Injectable()
export class AdminService {
  private readonly logger = new Logger(AdminService.name);

  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
  ) {}

  // ─── List users ───────────────────────────────────────────────────────────────

  async findAllUsers(): Promise<Omit<User, 'passwordHash'>[]> {
    const users = await this.usersRepo.find({ order: { createdAt: 'DESC' } });
    return users.map(({ passwordHash: _, ...safe }) => safe as User);
  }

  // ─── Stats ────────────────────────────────────────────────────────────────────

  async getStats() {
    const total = await this.usersRepo.count();
    const byRole: Record<Role, number> = {
      [Role.Admin]: 0,
      [Role.Manager]: 0,
      [Role.Developer]: 0,
      [Role.User]: 0,
    };

    const users = await this.usersRepo.find({ select: ['roles'] });
    for (const user of users) {
      for (const role of user.roles) {
        byRole[role] = (byRole[role] ?? 0) + 1;
      }
    }

    return { total, byRole };
  }

  // ─── Assign roles ─────────────────────────────────────────────────────────────

  async assignRoles(userId: string, dto: AssignRolesDto) {
    const user = await this.findUserOrFail(userId);

    user.roles = dto.roles;
    const saved = await this.usersRepo.save(user);
    const { passwordHash: _, ...safe } = saved;

    this.logger.log(`Admin changed roles for user [${userId}] → ${dto.roles}`);

    return {
      message: `Roles updated successfully.`,
      user: safe,
    };
  }

  // ─── Change email ─────────────────────────────────────────────────────────────

  async changeEmail(adminId: string, userId: string, dto: ChangeUserEmailDto) {
    const user = await this.findUserOrFail(userId);

    if (user.email === dto.email) {
      throw new ConflictException(
        'The new email is the same as the current email.',
      );
    }

    const taken = await this.usersRepo.findOne({ where: { email: dto.email } });
    if (taken) {
      throw new ConflictException(
        `Email "${dto.email}" is already used by another account.`,
      );
    }

    const oldEmail = user.email;
    user.email = dto.email;
    await this.usersRepo.save(user);

    this.logger.log(
      `Admin [${adminId}] changed email for user [${userId}]: ${oldEmail} → ${dto.email}`,
    );

    return {
      message: 'Email updated successfully.',
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        roles: user.roles,
      },
    };
  }

  // ─── Change password ──────────────────────────────────────────────────────────

  async changePassword(
    adminId: string,
    userId: string,
    dto: ChangeUserPasswordDto,
  ) {
    const user = await this.findUserOrFail(userId);

    const samePassword = await bcrypt.compare(dto.newPassword, user.passwordHash);
    if (samePassword) {
      throw new ConflictException(
        'New password must be different from the current password.',
      );
    }

    user.passwordHash = await bcrypt.hash(dto.newPassword, BCRYPT_ROUNDS);
    await this.usersRepo.save(user);

    this.logger.warn(
      `Admin [${adminId}] reset password for user [${userId}]`,
    );

    return {
      message: 'Password updated successfully. The user should log in again.',
      userId: user.id,
    };
  }

  // ─── Private helper ───────────────────────────────────────────────────────────

  private async findUserOrFail(userId: string): Promise<User> {
    const user = await this.usersRepo.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException(`User "${userId}" not found.`);
    return user;
  }
}
