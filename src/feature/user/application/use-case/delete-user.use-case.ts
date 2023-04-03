import { BaseUseCase } from '@/core/domain/base/base.use-case';
import { CreatedUserMapper } from '../../domain/mappers/created-user.mapper';
import { UserRepository } from '../../domain/user.repository';
import { CreatedUserDto } from '../dto/create-user.dto';

export class DeleteUsersUseCase implements BaseUseCase<CreatedUserDto[]> {
	private CreatedUserMapper: CreatedUserMapper;

	constructor(private readonly repository: UserRepository) {
		this.CreatedUserMapper = new CreatedUserMapper();
	}

	public async run(id: string): Promise<CreatedUserDto | any> {
		await this.repository.delete(id);
		return 'usuario eliminado';
	}
}
