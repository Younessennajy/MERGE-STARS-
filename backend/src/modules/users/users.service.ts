import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../../common/enums/role.enum';
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
    const user = this.usersRepo.create(data);
    return this.usersRepo.save(user);
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
