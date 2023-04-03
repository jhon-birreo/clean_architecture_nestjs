import { ApplicationError } from '@/core/application/errors/api.error';
import { msg } from '@/core/application/messages';
import { BaseUseCase } from '@/core/domain/base/base.use-case';
import { HttpStatus } from '@/core/domain/enum/httpStatus';
import { Bcript } from '@/shared/infra/drivers/helpers/bcrypt.helper';
import { JWTServices } from '@/shared/infra/drivers/helpers/jwt/jwt-sign.helper';
import { ExistUserByEmail } from '../../../user/application/services/exist-user-by-email.service';
import { FindUsersUseCase } from '../../../user/application/use-case/find-users.use-case';
import { UserRepository } from '../../../user/domain/user.repository';
import { AuthEntity } from '../../domain/auth.entity';
import { SignInAuthMapper } from '../mapper/auth.mapper';
export class SignInUseCase implements BaseUseCase<AuthEntity> {
	private readonly userExistByEmail: ExistUserByEmail;
	private readonly userFindById: FindUsersUseCase;
	private readonly signInAuthMapper: SignInAuthMapper;
	constructor(
		private readonly userRepository: UserRepository,
		private readonly bcrypt: Bcript,
		private readonly jwt: JWTServices,
	) {
		this.userExistByEmail = new ExistUserByEmail(userRepository);
		this.userFindById = new FindUsersUseCase(userRepository);
		this.signInAuthMapper = new SignInAuthMapper();
	}

	public async run(auth: AuthEntity): Promise<any> {
		const user = await this.userRepository.findOne({ email: auth.email });
		console.log(user);

		if (!user) {
			throw new ApplicationError({
				statusCode: HttpStatus.NOT_FOUND,
				message: msg.INVALID_USER_OR_PASSWORD,
			});
		}
		const checkPassword = await this.bcrypt.compare(auth.password, user.password);
		console.log(checkPassword);

		if (!checkPassword) {
			throw new ApplicationError({
				statusCode: HttpStatus.FORBIDDEN,
				message: msg.INVALID_USER_OR_PASSWORD,
			});
		}
		return {
			...this.signInAuthMapper.mapTo(user),
			token: this.jwt.sign({ id: user.id }),
		};
	}
}
