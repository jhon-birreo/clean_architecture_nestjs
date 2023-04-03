import { constants } from '@/core/application/utils/constant';
import * as Joi from '@hapi/joi';

export const envSchema: Joi.ObjectSchema = Joi.object({
	APP_URL: Joi.number().default('http://localhost'),
	APP_HOST: Joi.number().default('0.0.0.0'),
	APP_PORT: Joi.number().default(3000),
	API_VERSION: Joi.string().default('v1'),
	APP_NAME: Joi.string().default('API Delivery'),
	APP_DESCRIPTION: Joi.string().default('API Delivery'),
	DB_TYPE: Joi.string().default('postgres'),
	POSTGRES_DB: Joi.string().required(),
	POSTGRES_HOST: Joi.string().required(),
	POSTGRES_PORT: Joi.number().required(),
	POSTGRES_USER: Joi.string().required(),
	POSTGRES_PASSWORD: Joi.string().required(),
	JWT_SECRET: Joi.string().default(constants.JWT_SECRET),
	JWT_EXPIRE: Joi.string().default(constants.JWT_EXPIRE),
}).unknown(true);
