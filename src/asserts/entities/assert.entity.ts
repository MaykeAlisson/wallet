import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('asserts')
export class Assert {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  category: string;

  @Column()
  type: string;

  @Column()
  coin: string;

  @Column()
  price: number;

  @Column()
  amount: number;

  @Column({ name: 'average_price' })
  averagePrice: number;

  @Column({ name: 'invested_amount' })
  investedAmount: number;

  @Column({ type: 'int', name: 'wallet_id' })
  walletId: number;

  @Column({ name: 'create_at', default: new Date() })
  created: Date;
}
