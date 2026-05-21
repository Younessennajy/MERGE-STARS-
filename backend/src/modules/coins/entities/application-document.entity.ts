import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CoinApplication } from './coin-application.entity';

@Entity('application_documents')
export class ApplicationDocument {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ name: 'application_id' })
  applicationId: string;

  @ManyToOne(() => CoinApplication, (app) => app.documents, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'application_id' })
  application: CoinApplication;

  @Column({ length: 255 })
  name: string;

  @Column({ name: 'file_url', length: 500 })
  fileUrl: string;

  @Column({ length: 50, default: 'other' })
  type: string;

  @Column({ name: 'uploaded_by_id' })
  uploadedById: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;
}
