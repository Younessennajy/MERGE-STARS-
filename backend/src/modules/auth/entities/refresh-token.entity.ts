import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('refresh_tokens')
export class RefreshToken {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ name: 'user_id' })
  userId: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE', eager: false })
  @JoinColumn({ name: 'user_id' })
  user: User;

  /** bcrypt hash of the raw token stored in the HttpOnly cookie. */
  @Column({ name: 'token_hash', length: 255 })
  tokenHash: string;

  /**
   * All tokens issued within the same rotation chain share a familyId.
   * If a token from a revoked family is used, the entire family is invalidated
   * (refresh token reuse attack detection).
   */
  @Index()
  @Column({ name: 'family_id' })
  familyId: string;

  @Column({ name: 'expires_at', type: 'timestamptz' })
  expiresAt: Date;

  @Column({ name: 'is_revoked', default: false })
  isRevoked: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;
}
