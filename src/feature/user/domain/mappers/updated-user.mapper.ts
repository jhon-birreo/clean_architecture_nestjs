import { BaseMapper } from '@/core/domain/base/base.mapper';
import { UpdatedUserDto } from '../../application/dto/update-user.dto';
import { UserEntity } from '../user.entity';

export class UpdatedUserMapper implements BaseMapper<UpdatedUserDto, UserEntity> {
	public mapFrom(data: UpdatedUserDto): UserEntity {
		const user = new UserEntity();

		user.id = data.id;
		user.fullName = data.fullName;
		user.email = data.email;

		return user;
	}

	public mapTo(data: UserEntity): UpdatedUserDto {
		const user = new UpdatedUserDto();

		user.id = data.id;
		user.fullName = data.fullName;
		user.email = data.email;

		return user;
	}
}
