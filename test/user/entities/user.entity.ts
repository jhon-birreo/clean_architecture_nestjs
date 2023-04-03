import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
	@PrimaryGeneratedColumn()
	id: number;
	@Column({ unique: true })
	username: string;
	@Column()
	password: string;
	@Column({ nullable: true })
	authStrategy: string;
	@Column({ type: 'timestamp', default: new Date() })
	createdAt: Date;
	@Column({ type: 'timestamp', nullable: true })
	updateAt: Date;
	@DeleteDateColumn({ nullable: true })
	deletedAt: Date;
}
