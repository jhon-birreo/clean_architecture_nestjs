import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { AuthEntity } from '../../domain/auth.entity';
export class SignInDto extends AuthEntity {
	@ApiProperty({
		description: 'The email of the User',
		example: 'jhon@gmail.com',
	})
	@IsEmail()
	@IsNotEmpty()
	email: string;

	@ApiProperty({
		description: 'The password of the User',
		example: 'jhon123',
	})
	@IsNotEmpty()
	password: string;
}
