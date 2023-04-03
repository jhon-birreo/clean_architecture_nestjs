import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../../../domain/user.entity';

@Entity({ name: 'users' })
export class UserTypeorm extends UserEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column('text')
	fullName: string;

	@Column('text', { unique: true })
	email: string;

	@Column('text')
	// @Column('text', { select: false })
	password: string;

	@Column('bool', { default: true })
	isActive: boolean;

	@Column('text', { array: true, default: ['user'] })
	role: string[];

	@Column({ type: 'timestamp', default: new Date() })
	createdAt: Date;

	@Column({ type: 'timestamp', nullable: true })
	updateAt: Date;

	@DeleteDateColumn({ nullable: true })
	deletedAt: Date;
}
