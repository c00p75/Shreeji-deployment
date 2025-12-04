import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

export enum SettingCategory {
  PAYMENT_DPO = 'payment_dpo',
  PAYMENT_BANK_TRANSFER = 'payment_bank_transfer',
  EMAIL = 'email',
  GENERAL = 'general',
}

export enum SettingType {
  STRING = 'string',
  NUMBER = 'number',
  BOOLEAN = 'boolean',
  JSON = 'json',
  ENCRYPTED = 'encrypted',
}

@Entity('settings')
@Index(['category', 'key'], { unique: true })
export class Setting {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: SettingCategory })
  category: SettingCategory;

  @Column({ type: 'varchar', length: 100 })
  key: string;

  @Column({ type: 'text', nullable: true })
  value: string | null;

  @Column({ type: 'enum', enum: SettingType, default: SettingType.STRING })
  type: SettingType;

  @Column({ type: 'varchar', length: 255, nullable: true })
  label: string | null;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Column({ type: 'boolean', default: false })
  isSensitive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}


