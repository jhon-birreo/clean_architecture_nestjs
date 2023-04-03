import { constants } from '../application/utils/constant';

export const envConfig = () => {
	return {
		SERVICE_NAME: process.env.SERVICE_NAME,
		MONGO_URL: process.env.MONGO_URL,

		APP_URL: process.env.APP_URL,
		APP_HOST: process.env.APP_HOST,
		APP_PORT: process.env.APP_PORT,
		API_VERSION: process.env.API_VERSION,

		DB_CONNECTION: process.env.DB_CONNECTION,
		POSTGRES_DB: process.env.POSTGRES_DB,
		POSTGRES_HOST: process.env.POSTGRES_HOST,
		POSTGRES_PORT: Number(process.env.POSTGRES_PORT),
		POSTGRES_USER: process.env.POSTGRES_USER,
		POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,

		REDIS_PORT: process.env.REDIS_PORT,
		REDIS_HOST: process.env.REDIS_HOST,

		JWT_SECRET: process.env.JWT_SECRET || constants.JWT_SECRET,
		JWT_EXPIRE: process.env.JWT_EXPIRE || constants.JWT_EXPIRE,
	};
};
