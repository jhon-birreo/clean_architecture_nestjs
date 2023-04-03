import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { UserEntity } from '../../domain/user.entity';
export class CreateUserDto extends UserEntity {
	@ApiProperty({
		description: 'The name of the User',
		example: 'Jhon Doe',
	})
	@IsString()
	@IsNotEmpty()
	fullName: string;

	@ApiProperty({
		description: 'The email of the User',
		example: 'jhon@gmail.com',
	})
	@IsString()
	@MinLength(6)
	@MaxLength(50)
	@Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
		message: 'The password must have a Uppercase, lowercase letter and a number',
	})
	@ApiProperty({
		description: 'The password of the User',
		example: 'jhon123',
	})
	@IsNotEmpty()
	password: string;

	// @ApiProperty({
	// 	description: 'The isActive of the User',
	// 	example: 'true',
	// })
	// @IsNotEmpty()
	// isActive: boolean;

	// @ApiProperty({
	// 	description: 'The role of the User',
	// 	example: '["ADMIN", "CLIENT"]',
	// })
	// @IsNotEmpty()
	// @IsArray()
	// @ArrayMinSize(1)
	// role: string[];
}

export class CreatedUserDto extends CreateUserDto {}
