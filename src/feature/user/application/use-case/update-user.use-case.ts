import { BaseUseCase } from '@/core/domain/base/base.use-case';
import { UpdateUserMapper } from '../../domain/mappers/update-user.mapper';
import { UpdatedUserMapper } from '../../domain/mappers/updated-user.mapper';
import { UserRepository } from '../../domain/user.repository';
import { UpdatedUserDto, UpdateUserDto } from '../dto/update-user.dto';
import { ExistUserBeforeCreateUpdate } from '../services/exist-user-before-create-update.service';

export class UpdateUserUseCase implements BaseUseCase<UpdatedUserDto> {
	private UpdateUserMapper: UpdateUserMapper;
	private UpdatedUserMapper: UpdatedUserMapper;
	private readonly userExistBeforeCreateUpdate: ExistUserBeforeCreateUpdate;

	constructor(private readonly repository: UserRepository) {
		this.UpdateUserMapper = new UpdateUserMapper();
		this.UpdatedUserMapper = new UpdatedUserMapper();
		this.userExistBeforeCreateUpdate = new ExistUserBeforeCreateUpdate(repository);
	}

	public async run(id: string, user: UpdateUserDto): Promise<UpdatedUserDto> {
		await this.userExistBeforeCreateUpdate.validateUpdate(id, user.email);
		const entity = this.UpdateUserMapper.mapFrom(user);
		const createdUser = await this.repository.update(id, entity);
		return this.UpdatedUserMapper.mapTo(createdUser);
	}
}
