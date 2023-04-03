import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { envConfig } from './env.config';
const env = envConfig();
console.log(env);
console.log(process.env.POSTGRES_PASSWORD);

@Injectable()
export class TypeOrmConfig implements TypeOrmOptionsFactory {
	createTypeOrmOptions(): TypeOrmModuleOptions {
		return {
			type: 'postgres',
			host: process.env.POSTGRES_HOST,
			port: +process.env.POSTGRES_PORT,
			database: process.env.POSTGRES_DB,
			password: process.env.POSTGRES_PASSWORD,
			username: process.env.POSTGRES_USER,
			// host: env.POSTGRES_DB,
			// port: env.POSTGRES_PORT,
			// database: env.POSTGRES_DB,
			// password: env.POSTGRES_PASSWORD,
			// username: env.POSTGRES_USER,
			synchronize: true,
			entities: ['dist/feature/shared/infra/data/typeorm/entity/*{.ts,.js}'],
			// entities: ['dist/entities/*.entity.js'],
			// migrations: ['dist/migrations/*.migration.ts'],
		};
	}
}
