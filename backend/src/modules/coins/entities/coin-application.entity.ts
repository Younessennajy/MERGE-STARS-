import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApplicationStatus } from '../../../common/enums/application-status.enum';
import { CoinType } from '../../../common/enums/coin-type.enum';
import { User } from '../../users/entities/user.entity';
import { ApplicationDocument } from './application-document.entity';
import { ApplicationStatusHistory } from './application-status-history.entity';
import { ProductionTask } from './production-task.entity';

@Entity('coin_applications')
export class CoinApplication {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ name: 'user_id' })
  userId: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'coin_type', length: 50 })
  coinType: CoinType;

  @Column({ type: 'int', default: 1 })
  quantity: number;

  @Column({ name: 'metal_purity', type: 'decimal', precision: 5, scale: 2 })
  metalPurity: string;

  @Column({ name: 'special_request', type: 'text', nullable: true })
  specialRequest: string | null;

  @Column({ name: 'coin_value', type: 'decimal', precision: 12, scale: 2, nullable: true })
  coinValue: string | null;

  @Column({ name: 'financing_term', type: 'int', nullable: true })
  financingTerm: number | null;

  @Column({ name: 'monthly_payment', type: 'decimal', precision: 10, scale: 2, nullable: true })
  monthlyPayment: string | null;

  @Column({ name: 'down_payment', type: 'decimal', precision: 10, scale: 2, nullable: true })
  downPayment: string | null;

  @Column({ name: 'manufacturing_fee', type: 'decimal', precision: 10, scale: 2, nullable: true })
  manufacturingFee: string | null;

  @Column({ name: 'platform_fee', type: 'decimal', precision: 10, scale: 2, nullable: true })
  platformFee: string | null;

  @Column({
    type: 'varchar',
    length: 30,
    default: ApplicationStatus.Submitted,
  })
  status: ApplicationStatus;

  @Column({ name: 'rejection_note', type: 'text', nullable: true })
  rejectionNote: string | null;

  @Column({ name: 'submitted_at', type: 'timestamptz', default: () => 'NOW()' })
  submittedAt: Date;

  @Column({ name: 'reviewed_at', type: 'timestamptz', nullable: true })
  reviewedAt: Date | null;

  @Column({ name: 'approved_at', type: 'timestamptz', nullable: true })
  approvedAt: Date | null;

  @Column({ name: 'delivered_at', type: 'timestamptz', nullable: true })
  deliveredAt: Date | null;

  @OneToMany(() => ApplicationStatusHistory, (h) => h.application)
  statusHistory: ApplicationStatusHistory[];

  @OneToMany(() => ApplicationDocument, (d) => d.application)
  documents: ApplicationDocument[];

  @OneToOne(() => ProductionTask, (p) => p.application)
  productionTask: ProductionTask;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
