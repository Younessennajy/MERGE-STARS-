import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CoinApplication } from '../../coins/entities/coin-application.entity';
import { User } from '../../users/entities/user.entity';

@Entity('investments')
export class Investment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ name: 'user_id' })
  userId: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Index()
  @Column({ name: 'application_id', nullable: true })
  applicationId: string | null;

  @ManyToOne(() => CoinApplication, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'application_id' })
  application: CoinApplication | null;

  @Column({ name: 'amount_usd', type: 'decimal', precision: 14, scale: 2 })
  amountUsd: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;
}
