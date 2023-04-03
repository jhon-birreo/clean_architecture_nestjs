import { Bcript } from '@/shared/infra/drivers/helpers/bcrypt.helper';
import { AccessTokenStrategy } from '@/shared/infra/drivers/helpers/jwt/jwt-strategy.helper';
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../auth/infra/auth.module';
import { CreateUserUseCase } from '../application/use-case/create-user.use-case';
import { DeleteUsersUseCase } from '../application/use-case/delete-user.use-case';
import { FindUsersUseCase } from '../application/use-case/find-users.use-case';
import { UpdateUserUseCase } from '../application/use-case/update-user.use-case';
import { UserTypeorm } from './data/typeorm/user-typeorm.entity';
import { UserTypeormRepository } from './data/typeorm/user-typeorm.repository';
import { UserController } from './user.controller';

@Module({
	imports: [TypeOrmModule.forFeature([UserTypeorm]), forwardRef(() => AuthModule)],
	controllers: [UserController],
	exports: [UserModule, UserTypeormRepository],
	providers: [
		UserTypeormRepository,
		Bcript,
		{
			provide: CreateUserUseCase,
			useFactory: (repository: UserTypeormRepository, bcrypt: Bcript) => new CreateUserUseCase(repository, bcrypt),
			inject: [UserTypeormRepository, Bcript],
		},
		{
			provide: FindUsersUseCase,
			useFactory: (repository: UserTypeormRepository) => {
				return new FindUsersUseCase(repository);
			},
			inject: [UserTypeormRepository],
		},
		{
			provide: DeleteUsersUseCase,
			useFactory: (repository: UserTypeormRepository) => {
				return new DeleteUsersUseCase(repository);
			},
			inject: [UserTypeormRepository],
		},
		{
			provide: UpdateUserUseCase,
			useFactory: (repository: UserTypeormRepository) => {
				return new UpdateUserUseCase(repository);
			},
			inject: [UserTypeormRepository],
		},
		{
			provide: AccessTokenStrategy,
			useFactory: (repository: UserTypeormRepository) => {
				return new AccessTokenStrategy(repository);
			},
			inject: [UserTypeormRepository],
		},
	],
})
export class UserModule {}
