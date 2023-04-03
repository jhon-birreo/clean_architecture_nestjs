import { BaseEntity } from '@/core/domain/base/base.entity';

export class UserEntity extends BaseEntity {
	fullName: string;
	password: string;
	email: string;
	isActive: boolean;
	role: string[];
}
