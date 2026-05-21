import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from '../../../common/enums/role.enum';
import { Exclude } from 'class-transformer';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /** Public identifier shown in dashboard — e.g. MS-782456 */
  @Index({ unique: true })
  @Column({ name: 'merge_id', length: 20 })
  mergeId: string;

  @Column({ name: 'first_name', length: 100 })
  firstName: string;

  @Column({ name: 'last_name', length: 100 })
  lastName: string;

  @Index({ unique: true })
  @Column({ length: 255, nullable: true })
  email: string | null;

  @Index({ unique: true })
  @Column({ length: 30, nullable: true })
  phone: string | null;

  @Index({ unique: true })
  @Column({ name: 'personal_id', length: 50 })
  personalId: string;

  @Exclude()
  @Column({ name: 'password_hash', length: 255 })
  passwordHash: string;

  @Column({ type: 'text', array: true, default: () => "'{user}'" })
  roles: Role[];

  @Column({ name: 'is_verified', default: false })
  isVerified: boolean;

  @Column({ length: 10, default: 'geo' })
  region: string;

  @Column({ name: 'accepted_terms', default: false })
  acceptedTerms: boolean;

  @Column({ name: 'accepted_financing_agreement', default: false })
  acceptedFinancingAgreement: boolean;

  @Column({ name: 'confirmed_accuracy', default: false })
  confirmedAccuracy: boolean;

  /** Merge Coin balance in MGS units (updated on approved applications) */
  @Column({
    name: 'merge_coin_balance',
    type: 'decimal',
    precision: 14,
    scale: 2,
    default: 0,
  })
  mergeCoinBalance: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
