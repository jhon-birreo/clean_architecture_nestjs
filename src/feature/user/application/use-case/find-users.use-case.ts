import { ApplicationError } from '@/core/application/errors/api.error';
import { msg } from '@/core/application/messages';
import { BaseUseCase } from '@/core/domain/base/base.use-case';
import { HttpStatus } from '@/core/domain/enum/httpStatus';
import { QueryDto } from '../../../shared/application/query-params.dto';
import { CreatedUserMapper } from '../../domain/mappers/created-user.mapper';
import { UserRepository } from '../../domain/user.repository';
import { CreatedUserDto } from '../dto/create-user.dto';

export class FindUsersUseCase implements BaseUseCase<CreatedUserDto[]> {
	private CreatedUserMapper: CreatedUserMapper;

	constructor(private readonly repository: UserRepository) {
		this.CreatedUserMapper = new CreatedUserMapper();
	}

	public async run(params: QueryDto): Promise<CreatedUserDto[]> {
		const users = await this.repository.findAll(params);
		return users.map((user) => this.CreatedUserMapper.mapTo(user));
	}

	public async findById(id: string): Promise<CreatedUserDto> {
		const user = await this.repository.findById(id);

		if (user === null) {
			throw new ApplicationError({
				statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
				message: msg.RESOURCE_NOT_FOUND,
			});
		}
		return this.CreatedUserMapper.mapTo(user);
	}
}
