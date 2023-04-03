import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwaggerDocument(app: INestApplication) {
	const configService = app.get(ConfigService);
	const APP_NAME = configService.get('APP_NAME', 'App Name');

	const APP_DESCRIPTION = configService.get('APP_DESCRIPTION', 'App description');
	const API_VERSION = configService.get('API_VERSION', 'v1');
	const config = new DocumentBuilder()
		.setTitle(APP_NAME)
		.setDescription(APP_DESCRIPTION)
		.setVersion(API_VERSION)
		.addBearerAuth
		// {
		//   type: 'http',
		//   scheme: 'bearer',
		//   bearerFormat: 'jwt',
		//   name: 'JWT',
		//   description: 'Enter to JWT',
		//   in: 'header',
		// },
		// 'access-token',
		()
		.addTag('User')
		.build();

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api-document', app, document);
}
