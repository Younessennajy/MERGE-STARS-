import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Brand } from './brand.entity';
import { Category } from './category.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ name: 'brand_id', nullable: true })
  brandId: string | null;

  @ManyToOne(() => Brand, (brand) => brand.products, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'brand_id' })
  brand: Brand | null;

  @Index()
  @Column({ name: 'category_id' })
  categoryId: string;

  @ManyToOne(() => Category, (category) => category.products, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column({ length: 200 })
  name: string;

  @Index({ unique: true })
  @Column({ length: 80, nullable: true })
  sku: string | null;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ name: 'price_usd', type: 'decimal', precision: 12, scale: 2 })
  priceUsd: string;

  @Column({ name: 'metal_type', length: 30, nullable: true })
  metalType: string | null;

  @Column({
    name: 'weight_grams',
    type: 'decimal',
    precision: 10,
    scale: 3,
    nullable: true,
  })
  weightGrams: string | null;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  purity: string | null;

  @Column({ type: 'int', default: 0 })
  stock: number;

  @Column({ name: 'image_url', length: 500, nullable: true })
  imageUrl: string | null;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @Index()
  @Column({ name: 'created_by_id' })
  createdById: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
