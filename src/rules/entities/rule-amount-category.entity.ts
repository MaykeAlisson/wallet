import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('rules_amount_category')
export class RuleAmountCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  category: string;

  @Column()
  amount: number;

  @Column({ name: 'wallet_id' })
  walletId: number;

  @Column({ name: 'create_at', default: new Date() })
  created: Date;
}
