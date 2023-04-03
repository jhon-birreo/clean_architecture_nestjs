import { envConfig } from '@/core/config/env.config';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { setEnvironment } from './core/config/environments';
import { TypeOrmConfig } from './core/config/typeorm.config';
import { envSchema } from './core/infra/env/config.env';
import { AuthModule } from './feature/auth/infra/auth.module';
import { UserModule } from './feature/shared/infra/module';

// import { UserModule } from './user/user.module';
@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			expandVariables: true,
			cache: true,
			envFilePath: setEnvironment(),
			load: [envConfig],
			validationSchema: envSchema,
			validationOptions: {
				allowUnknown: false,
				abortEarly: true,
			},
		}),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			useClass: TypeOrmConfig,
		}),
		UserModule,
		AuthModule,
	],
	controllers: [AppController],
	providers: [AppService],
	exports: [UserModule],
})
export class AppModule {}
