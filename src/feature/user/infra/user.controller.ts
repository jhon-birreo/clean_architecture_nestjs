import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Auth } from '../../auth/infra/decorator';
import { QueryDto } from '../../shared/application/query-params.dto';
import { CreateUserDto } from '../application/dto/create-user.dto';
import { UpdateUserDto } from '../application/dto/update-user.dto';
import { CreateUserUseCase } from '../application/use-case/create-user.use-case';
import { DeleteUsersUseCase } from '../application/use-case/delete-user.use-case';
import { FindUsersUseCase } from '../application/use-case/find-users.use-case';
import { UpdateUserUseCase } from '../application/use-case/update-user.use-case';
import { UserTypeorm } from './data/typeorm/user-typeorm.entity';

@ApiBearerAuth()
@ApiTags('User')
@Controller('user')
export class UserController {
	constructor(
		private readonly saveUsersUseCase: CreateUserUseCase,
		private readonly findUsersUseCase: FindUsersUseCase,
		private readonly updateUsersUseCase: UpdateUserUseCase,
		private readonly deleteUsersUseCase: DeleteUsersUseCase,
	) {}

	@Post()
	@ApiOperation({ summary: 'Creates an user' })
	@ApiCreatedResponse({
		description: 'Create users successful!',
		type: UserTypeorm,
	})
	create(@Body() createUserDto: CreateUserDto) {
		return this.saveUsersUseCase.run(createUserDto);
	}

	@Get()
	@Auth()
	@ApiOperation({
		summary: 'Find all users',
	})
	@ApiQuery({
		name: 'skip',
		description: 'This is the description of a query argument. In this instance, we have a boolean value.',
		type: Number,
		required: false,
	})
	@ApiQuery({
		name: 'take',
		description: 'This is the description of a query argument. In this instance, we have a boolean value.',
		type: Number,
		required: false,
	})
	findAll(@Query() query: QueryDto) {
		// return this.userRepo.findAll({});
		return this.findUsersUseCase.run(query);
	}

	@Get(':id')
	@ApiOperation({
		summary: 'Find one user by id',
	})
	findOne(@Param('id') id: string) {
		return this.findUsersUseCase.findById(id);
	}

	@Patch(':id')
	@ApiOperation({
		summary: 'Updates an user',
	})
	update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
		return this.updateUsersUseCase.run(id, updateUserDto);
	}

	@Delete(':id')
	@ApiOperation({
		summary: 'Delete user by id',
	})
	remove(@Param('id') id: string) {
		return this.deleteUsersUseCase.run(id);
	}
}
