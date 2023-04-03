import { ValidRoles } from '@/shared/damain/enums/valis-roles.enum';
import { JWTAuthGuard } from '@/shared/infra/drivers/guards/ jwt-auth.guard';
import { UserRoleGuard } from '@/shared/infra/drivers/guards/user-role.guard';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserEntity } from '../../user/domain/user.entity';
import { SignInDto } from '../application/dto/sign-in-auth.dto';
import { CheckStatusUseCase } from '../application/use-cases/refresh-token.use-case';
import { SignInUseCase } from '../application/use-cases/sign-in.use-case';
import { SignOutUseCase } from '../application/use-cases/sign-out.use-case';
import { AuthEntity } from '../domain/auth.entity';
import { Auth } from './decorator';
import { GetUser } from './decorator/get-user.decorator';
import { RoleProtected } from './decorator/role-protected.decorator';

@ApiTags('Auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
	constructor(
		private readonly signInUseCase: SignInUseCase,
		private readonly signOutUseCase: SignOutUseCase,
		private readonly checkStatusMapper: CheckStatusUseCase,
	) {}

	@Post('sign-in')
	@ApiOperation({ summary: 'Sign In user' })
	@ApiCreatedResponse({
		description: 'SignIn user successful!',
		type: AuthEntity,
	})
	signIn(@Body() signInDto: SignInDto) {
		return this.signInUseCase.run(signInDto);
	}

	@Post('sign-out')
	@ApiOperation({ summary: 'Sign Out user' })
	@ApiCreatedResponse({
		description: 'SignOut user successful!',
		type: AuthEntity,
	})
	signOut(@Body() signOutDto: SignInDto) {
		return this.signInUseCase.run(signOutDto);
	}

	@Get('check-status')
	@Auth()
	checkStatus(@GetUser() user: UserEntity) {
		return this.checkStatusMapper.run(user);
	}

	@Get('private2')
	@RoleProtected(ValidRoles.USER, ValidRoles.SUPER_USER)
	@UseGuards(JWTAuthGuard, UserRoleGuard)
	privateRouter(@GetUser() user: UserEntity) {
		return {
			ok: true,
			user,
		};
	}

	@Get('private3')
	@Auth()
	privateRouter3(@GetUser() user: UserEntity) {
		return {
			ok: true,
			user,
		};
	}
}
