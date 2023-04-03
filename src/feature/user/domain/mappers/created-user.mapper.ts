import { BaseMapper } from '@/core/domain/base/base.mapper';
import { CreatedUserDto } from '../../application/dto/create-user.dto';
import { UserEntity } from '../user.entity';

export class CreatedUserMapper implements BaseMapper<CreatedUserDto, UserEntity> {
	public mapFrom(data: CreatedUserDto): UserEntity {
		const user = new UserEntity();

		user.id = data.id;
		user.fullName = data.fullName;
		user.email = data.email;

		return user;
	}

	public mapTo(data: UserEntity): CreatedUserDto {
		const user = new CreatedUserDto();

		user.id = data.id;
		user.fullName = data.fullName;
		user.email = data.email;

		return user;
	}
}
