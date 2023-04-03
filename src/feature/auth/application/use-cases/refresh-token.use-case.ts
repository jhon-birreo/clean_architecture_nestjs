import { BaseUseCase } from '@/core/domain/base/base.use-case';
import { JWTServices } from '@/shared/infra/drivers/helpers/jwt/jwt-sign.helper';
import { UserEntity } from '../../../user/domain/user.entity';
import { AuthEntity } from '../../domain/auth.entity';
import { CheckStatusMapper } from '../mapper/check-status.mapper';
export class CheckStatusUseCase implements BaseUseCase<AuthEntity> {
	private readonly checkStatusMapper: CheckStatusMapper;
	constructor(private readonly jwt: JWTServices) {
		this.checkStatusMapper = new CheckStatusMapper();
	}

	public async run(user: UserEntity): Promise<any> {
		// const user = await this.userRepository.findOne({ email: auth.email });
		// if (!user) {
		// 	throw new ApplicationError({
		// 		statusCode: HttpStatus.NOT_FOUND,
		// 		message: msg.INVALID_USER_OR_PASSWORD,
		// 	});
		// }

		// const returnUser = {
		// 	name: user.fullName,
		// 	email: user.email,
		// 	date: user.createdAt,
		// };

		// const verifyToken = await this.jwt.verify(token);
		// console.log(verifyToken);
		// if (!verifyToken) {
		// 	throw new ApplicationError({
		// 		statusCode: HttpStatus.UNAUTHORIZED,
		// 		message: msg.INVALID_TOKEN,
		// 	});
		// }
		// const newToken = await this.jwt.sign(returnUser);
		// returnUser['token'] = newToken;
		// console.log(returnUser);

		return {
			...this.checkStatusMapper.mapTo(user),
			token: this.jwt.sign({ id: user.id }),
		};
	}
}
