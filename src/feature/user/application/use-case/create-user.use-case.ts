import { BaseUseCase } from '@/core/domain/base/base.use-case';
import { Bcript } from '@/shared/infra/drivers/helpers/bcrypt.helper';
import { CreateUserMapper } from '../../domain/mappers/create-user.mapper';
import { CreatedUserMapper } from '../../domain/mappers/created-user.mapper';
import { UserRepository } from '../../domain/user.repository';
import { CreatedUserDto, CreateUserDto } from '../dto/create-user.dto';
import { ExistUserBeforeCreateUpdate } from '../services/exist-user-before-create-update.service';

export class CreateUserUseCase implements BaseUseCase<CreatedUserDto> {
	private CreateUserMapper: CreateUserMapper;
	private CreatedUserMapper: CreatedUserMapper;
	private readonly userExistBeforeCreateUpdate: ExistUserBeforeCreateUpdate;

	constructor(private readonly repository: UserRepository, private readonly becrypt: Bcript) {
		this.CreateUserMapper = new CreateUserMapper();
		this.CreatedUserMapper = new CreatedUserMapper();
		this.userExistBeforeCreateUpdate = new ExistUserBeforeCreateUpdate(repository);
	}

	public async run(user: CreateUserDto): Promise<CreatedUserDto> {
		await this.userExistBeforeCreateUpdate.validateCreate(user.email);
		user.password = await this.becrypt.hash(user.password);
		const entity = this.CreateUserMapper.mapFrom(user);
		const createdUser = await this.repository.create(entity);
		return this.CreatedUserMapper.mapTo(createdUser);
	}
}
