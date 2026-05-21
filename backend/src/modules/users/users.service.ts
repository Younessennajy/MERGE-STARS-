import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../../common/enums/role.enum';
import { generateMergeId } from '../../common/utils/merge-id.util';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
  ) {}

  async findById(id: string): Promise<User> {
    const user = await this.usersRepo.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found.');
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepo.findOne({ where: { email } });
  }

  async findByPhone(phone: string): Promise<User | null> {
    return this.usersRepo.findOne({ where: { phone } });
  }

  async findByPersonalId(personalId: string): Promise<User | null> {
    return this.usersRepo.findOne({ where: { personalId } });
  }

  /** Returns the first admin found, or null if no admin exists yet. */
  async findAnyAdmin(): Promise<User | null> {
    return this.usersRepo
      .createQueryBuilder('user')
      .where(':role = ANY(user.roles)', { role: Role.Admin })
      .getOne();
  }

  /**
   * Resolves a login identifier to a user.
   * Tries email → phone → personalId in order.
   */
  async findByIdentifier(identifier: string): Promise<User | null> {
    return (
      (await this.findByEmail(identifier)) ??
      (await this.findByPhone(identifier)) ??
      (await this.findByPersonalId(identifier))
    );
  }

  async create(data: Partial<User>): Promise<User> {
    if (!data.mergeId) {
      data.mergeId = await this.generateUniqueMergeId();
    }
    const user = this.usersRepo.create(data);
    return this.usersRepo.save(user);
  }

  async generateUniqueMergeId(): Promise<string> {
    for (let i = 0; i < 10; i++) {
      const mergeId = generateMergeId();
      const exists = await this.usersRepo.findOne({ where: { mergeId } });
      if (!exists) return mergeId;
    }
    throw new ConflictException('Could not generate unique Merge ID.');
  }

  toPublicProfile(user: User) {
    const { passwordHash: _, ...profile } = user;
    return profile;
  }

  async update(id: string, dto: UpdateUserDto): Promise<User> {
    const user = await this.findById(id);

    if (dto.email && dto.email !== user.email) {
      const existing = await this.findByEmail(dto.email);
      if (existing) throw new ConflictException('Email is already in use.');
    }

    Object.assign(user, dto);
    return this.usersRepo.save(user);
  }
}
