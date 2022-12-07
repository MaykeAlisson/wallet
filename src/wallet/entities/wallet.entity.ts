import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('wallets')
export class Wallet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ name: 'max_percent_assert' })
  maxPecentAssert: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'create_at', default: new Date() })
  created: Date;
}
