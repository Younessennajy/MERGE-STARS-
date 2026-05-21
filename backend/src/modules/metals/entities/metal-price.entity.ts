import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Metal } from '../../../common/enums/metal.enum';

@Entity('metal_prices')
export class MetalPrice {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  @Index()
  @Column({ length: 20 })
  metal: Metal;

  @Column({ name: 'price_usd', type: 'decimal', precision: 12, scale: 4 })
  priceUsd: string;

  @Column({ name: 'change_pct', type: 'decimal', precision: 6, scale: 4, nullable: true })
  changePct: string | null;

  @Index()
  @CreateDateColumn({ name: 'recorded_at', type: 'timestamptz' })
  recordedAt: Date;
}
