import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApplicationStatus } from '../../../common/enums/application-status.enum';
import { CoinApplication } from './coin-application.entity';

@Entity('application_status_history')
export class ApplicationStatusHistory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ name: 'application_id' })
  applicationId: string;

  @ManyToOne(() => CoinApplication, (app) => app.statusHistory, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'application_id' })
  application: CoinApplication;

  @Column({ name: 'from_status', length: 30, nullable: true })
  fromStatus: ApplicationStatus | null;

  @Column({ name: 'to_status', length: 30 })
  toStatus: ApplicationStatus;

  @Column({ name: 'changed_by_id', nullable: true })
  changedById: string | null;

  @Column({ type: 'text', nullable: true })
  note: string | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;
}
