import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CoinApplication } from './coin-application.entity';

@Entity('production_tasks')
export class ProductionTask {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'application_id', unique: true })
  applicationId: string;

  @OneToOne(() => CoinApplication, (app) => app.productionTask, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'application_id' })
  application: CoinApplication;

  @Column({ name: 'assigned_factory', length: 100, nullable: true })
  assignedFactory: string | null;

  @Column({ name: 'progress_percent', type: 'int', default: 0 })
  progressPercent: number;

  @Column({ name: 'start_date', type: 'timestamptz', nullable: true })
  startDate: Date | null;

  @Column({ name: 'expected_completion', type: 'timestamptz', nullable: true })
  expectedCompletion: Date | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
