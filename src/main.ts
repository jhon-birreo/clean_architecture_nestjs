import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import bodyParser from 'body-parser';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import morgan from 'morgan';
import { AppModule } from './app.module';
import { envConfig } from './core/config/env.config';
import { setupSwaggerDocument } from './core/config/swagger.config';
async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const env = envConfig();
	app.setGlobalPrefix(`/api/${env.API_VERSION}`);
	app.useGlobalPipes(new ValidationPipe());
	app.use(helmet());
	app.use(compression());
	app.use(bodyParser.json({ limit: '50mb' }));
	app.use(morgan('dev'));
	app.use(
		rateLimit({
			windowMs: 1000 * 60 * 60,
			max: 1000, // 1000 requests por windowMs
			message: '⚠️  Too many request created from this IP, please try again after an hour',
		}),
	);

	setupSwaggerDocument(app);
	await app.listen(env.APP_PORT);
}
bootstrap().catch((e) => {
	Logger.error(`❌  Error starting server, ${e}`, '', 'Bootstrap', false);
	throw e;
});
