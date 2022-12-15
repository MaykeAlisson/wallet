import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('rules_percent_coin')
export class RulePercentCoin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  coin: string;

  @Column()
  percent: number;

  @Column({ name: 'wallet_id' })
  walletId: number;

  @Column({ name: 'create_at', default: new Date() })
  created: Date;
}
