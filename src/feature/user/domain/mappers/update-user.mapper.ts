import { BaseMapper } from '@/core/domain/base/base.mapper';
import { UpdateUserDto } from '../../application/dto/update-user.dto';
import { UserEntity } from '../user.entity';

export class UpdateUserMapper extends BaseMapper<UpdateUserDto, UserEntity> {
	public mapFrom(data: UpdateUserDto): UserEntity {
		const user = new UserEntity();

		user.fullName = data.fullName;
		user.email = data.email.toLowerCase().trim();
		user.password = data.password;
		user.updateAt = new Date();

		return user;
	}

	public mapTo(data: UserEntity): UpdateUserDto {
		const user = new UpdateUserDto();

		user.id = data.id;
		user.fullName = data.fullName;
		user.email = data.email;
		user.password = data.password;

		return user;
	}
}
