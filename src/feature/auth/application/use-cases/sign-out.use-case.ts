import { BaseUseCase } from '@/core/domain/base/base.use-case';
import { ExistUserByEmail } from '../../../user/application/services/exist-user-by-email.service';
import { FindUsersUseCase } from '../../../user/application/use-case/find-users.use-case';
import { UserRepository } from '../../../user/domain/user.repository';
import { AuthEntity } from '../../domain/auth.entity';

export class SignOutUseCase implements BaseUseCase<AuthEntity> {
	private readonly userExistByEmail: ExistUserByEmail;
	private readonly userFindById: FindUsersUseCase;
	constructor(private readonly userRepository: UserRepository) {
		this.userExistByEmail = new ExistUserByEmail(userRepository);
		this.userFindById = new FindUsersUseCase(userRepository);
	}

	public async run(auth: AuthEntity): Promise<AuthEntity> {
		console.log(auth);

		// await this.userExistBeforeCreateUpdate.validateCreate(user.email);
		// const entity = this.CreateUserMapper.mapFrom(user);
		// const createdUser = await this.repository.create(entity);
		// return this.CreatedUserMapper.mapTo(createdUser);
		return auth;
	}
}
