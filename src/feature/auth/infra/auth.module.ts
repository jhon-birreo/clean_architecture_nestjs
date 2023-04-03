import { envConfig } from '@/core/config/env.config';
import { Bcript } from '@/shared/infra/drivers/helpers/bcrypt.helper';
import { JWTServices } from '@/shared/infra/drivers/helpers/jwt/jwt-sign.helper';
import { AccessTokenStrategy } from '@/shared/infra/drivers/helpers/jwt/jwt-strategy.helper';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserTypeormRepository } from '../../user/infra/data/typeorm/user-typeorm.repository';
import { UserModule } from '../../user/infra/user.module';
import { CheckStatusUseCase } from '../application/use-cases/refresh-token.use-case';
import { SignInUseCase } from '../application/use-cases/sign-in.use-case';
import { SignOutUseCase } from '../application/use-cases/sign-out.use-case';
import { AuthController } from './auth.controller';

@Module({
	imports: [
		UserModule,
		PassportModule.register({ defaultStrategy: 'jwt' }),
		JwtModule.register({
			secret: envConfig().JWT_SECRET,
			signOptions: { expiresIn: envConfig().JWT_EXPIRE },
		}),
	],
	controllers: [AuthController],
	providers: [
		Bcript,
		JWTServices,
		AccessTokenStrategy,
		{
			provide: SignInUseCase,
			useFactory: (repository: UserTypeormRepository, bcript: Bcript, jwt: JWTServices) =>
				new SignInUseCase(repository, bcript, jwt),
			inject: [UserTypeormRepository, Bcript, JWTServices],
		},
		{
			provide: SignOutUseCase,
			useFactory: (repository: UserTypeormRepository) => {
				return new SignOutUseCase(repository);
			},
			inject: [UserTypeormRepository],
		},
		{
			provide: CheckStatusUseCase,
			useFactory: (jwt: JWTServices) => {
				return new CheckStatusUseCase(jwt);
			},
			inject: [JWTServices],
		},
	],
	exports: [AccessTokenStrategy, JwtModule, PassportModule],
})
export class AuthModule {}
