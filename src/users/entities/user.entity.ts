import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm'

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({ name: 'create_at',default: new Date()})
    created: Date;
}
