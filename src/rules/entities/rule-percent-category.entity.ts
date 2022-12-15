import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('rules_percent_category')
export class RulePercentCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  category: string;

  @Column()
  percent: number;

  @Column({ name: 'wallet_id' })
  walletId: number;

  @Column({ name: 'create_at', default: new Date() })
  created: Date;
}
