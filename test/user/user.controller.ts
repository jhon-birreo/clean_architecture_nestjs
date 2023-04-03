import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post()
	@ApiOperation({ summary: 'Creates an user' })
	create(@Body() createUserDto: CreateUserDto) {
		return this.userService.create(createUserDto);
	}

	@Get()
	@ApiOperation({
		summary: 'Find all users',
	})
	findAll() {
		return this.userService.findAll();
	}

	@Get(':id')
	@ApiOperation({
		summary: 'Find one user by id',
	})
	findOne(@Param('id', ParseIntPipe) id: number) {
		return this.userService.findOne(id);
	}

	@Patch(':id')
	update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
		return this.userService.update(id, updateUserDto);
	}

	@Delete(':id')
	remove(@Param('id', ParseIntPipe) id: number) {
		return this.userService.remove(id);
	}
}
