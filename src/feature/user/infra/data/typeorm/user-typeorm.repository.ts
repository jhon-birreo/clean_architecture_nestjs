import { InfrastructureError } from '@/core/application/errors/api.error';
import { BaseRepository } from '@/core/domain/base/base.repository';
import { HttpStatus } from '@/core/domain/enum/httpStatus';
import { QueryDto } from '@/shared/application/query-params.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../../../application/dto/create-user.dto';
import { UpdateUserDto } from '../../../application/dto/update-user.dto';
import { UserEntity } from '../../../domain/user.entity';
import { UserTypeorm } from './user-typeorm.entity';

@Injectable()
export class UserTypeormRepository implements BaseRepository<UserEntity> {
	constructor(@InjectRepository(UserTypeorm) private typeorm: Repository<UserTypeorm>) {}
	async create(data: CreateUserDto): Promise<UserEntity> {
		try {
			const newuser = this.typeorm.create(data);
			return this.typeorm.save(newuser);
		} catch (error) {
			if (error instanceof Error) {
				throw new InfrastructureError({
					statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
					message: error.message,
				});
			}
		}
	}
	async update(id: string, data: UpdateUserDto): Promise<UserEntity> {
		try {
			return await this.typeorm
				.createQueryBuilder()
				.update(UserTypeorm, data)
				.where('id = :id', { id })
				.returning('*')
				.updateEntity(true)
				.execute()
				.then((value) => {
					if (value.affected) {
						return value.raw[0];
					}
				});
		} catch (error) {
			if (error instanceof Error) {
				throw new InfrastructureError({
					statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
					message: error.message,
				});
			}
		}
	}
	async findAll(filter: QueryDto): Promise<UserEntity[]> {
		try {
			return await this.typeorm.find({
				skip: filter.skip,
				take: filter.take,
			});
		} catch (error) {
			if (error instanceof Error) {
				throw new InfrastructureError({
					statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
					message: error.message,
				});
			}
		}
	}
	async findById(id: string): Promise<UserEntity> {
		try {
			return await this.typeorm.findOne({ where: { id } });
		} catch (error) {
			if (error instanceof Error) {
				throw new InfrastructureError({
					statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
					message: error.message,
				});
			}
		}
	}
	async findOne(filter: Partial<Omit<UserTypeorm, 'role'>>): Promise<UserEntity> {
		try {
			return await this.typeorm.findOne({ where: filter });
		} catch (error) {
			if (error instanceof Error) {
				throw new InfrastructureError({
					statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
					message: error.message,
				});
			}
		}
	}
	async delete(id: string): Promise<void> {
		try {
			await this.typeorm.softDelete(id);
		} catch (error) {
			if (error instanceof Error) {
				throw new InfrastructureError({
					statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
					message: error.message,
				});
			}
		}
	}
}
