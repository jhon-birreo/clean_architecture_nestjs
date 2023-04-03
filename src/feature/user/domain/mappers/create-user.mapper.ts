import { BaseMapper } from '@/core/domain/base/base.mapper';
import { CreateUserDto } from '../../application/dto/create-user.dto';
import { UserEntity } from '../user.entity';

export class CreateUserMapper extends BaseMapper<CreateUserDto, UserEntity> {
	public mapFrom(data: CreateUserDto): UserEntity {
		const user = new UserEntity();

		user.fullName = data.fullName;
		user.email = data.email.toLowerCase().trim();
		user.password = data.password;

		return user;
	}

	public mapTo(data: UserEntity): CreateUserDto {
		const user = new CreateUserDto();

		user.id = data.id;
		user.fullName = data.fullName;
		user.email = data.email;
		user.password = data.password;

		return user;
	}
}
