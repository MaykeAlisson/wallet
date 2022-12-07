import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('rules_percent_type')
export class RulePercentType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  percent: number;

  @Column({ name: 'wallet_id' })
  walletId: number;

  @Column({ name: 'create_at', default: new Date() })
  created: Date;
}
