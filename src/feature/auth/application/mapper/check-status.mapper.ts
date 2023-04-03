import { BaseMapper } from '@/core/domain/base/base.mapper';
import { UserEntity } from '../../../user/domain/user.entity';
import { SignInDto } from '../dto/sign-in-auth.dto';

export class CheckStatusMapper extends BaseMapper<SignInDto, UserEntity> {
	public mapFrom(data: UserEntity): UserEntity {
		const auth = new UserEntity();

		auth.email = data.email;
		auth.password = data.password;
		auth.fullName = data.fullName;

		return auth;
	}

	public mapTo(data: UserEntity): UserEntity {
		const auth = new UserEntity();

		auth.email = data.email;
		auth.password = data.password;
		auth.fullName = data.fullName;
		auth.isActive = data.isActive;
		auth.role = data.role;

		return auth;
	}
}
