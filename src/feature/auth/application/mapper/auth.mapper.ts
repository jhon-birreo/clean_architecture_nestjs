import { BaseMapper } from '@/core/domain/base/base.mapper';
import { AuthEntity } from '../../domain/auth.entity';
import { SignInDto } from '../dto/sign-in-auth.dto';

export class SignInAuthMapper extends BaseMapper<SignInDto, AuthEntity> {
	public mapFrom(data: SignInDto): AuthEntity {
		const auth = new AuthEntity();

		auth.email = data.email;
		auth.password = data.password;
		auth.token = data.token;

		return auth;
	}

	public mapTo(data: AuthEntity): SignInDto {
		const auth = new SignInDto();

		auth.email = data.email;
		auth.password = data.password;
		auth.token = data.token;

		return auth;
	}
}
