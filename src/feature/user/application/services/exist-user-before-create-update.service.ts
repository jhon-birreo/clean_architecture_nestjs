import { ApplicationError } from '@/core/application/errors/api.error';
import { msg } from '@/core/application/messages';
import { HttpStatus } from '@/core/domain/enum/httpStatus';
import { UserRepository } from '../../domain/user.repository';
import { FindUsersUseCase } from '../use-case/find-users.use-case';
import { ExistUserByEmail } from './exist-user-by-email.service';

export class ExistUserBeforeCreateUpdate {
	private readonly _userExistByEmail: ExistUserByEmail;
	private readonly _userFindById: FindUsersUseCase;
	constructor(private readonly userRepository: UserRepository) {
		this._userExistByEmail = new ExistUserByEmail(userRepository);
		this._userFindById = new FindUsersUseCase(userRepository);
	}

	async validateCreate(userEmail: string): Promise<any> {
		const isUserExiste = await this._userExistByEmail.run(userEmail);
		if (!isUserExiste) {
			throw new ApplicationError({
				statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
				message: msg.THE_FIELD_AND_VALUE_ALREADY_EXISTS.replace('{field}', msg.USER).replace('{value}', userEmail),
			});
		}
	}

	async validateUpdate(id: string, userEmail: string): Promise<any> {
		if (!userEmail) {
			return;
		}
		console.log(userEmail);

		const isUserExiste = await this._userExistByEmail.run(userEmail);
		const existUser = await this._userFindById.findById(id);
		if (!existUser) {
			throw new ApplicationError({
				statusCode: HttpStatus.BAD_REQUEST,
				message: msg.RESOURCE_NOT_FOUND,
			});
		}
		if (existUser && existUser.email != userEmail) {
			if (!isUserExiste) {
				throw new ApplicationError({
					statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
					message: msg.USER_WITH_EMAIL_ALREADY_EXISTS.replace('{email}', userEmail),
				});
			}
		}
	}
}
