export interface IRedisRepository {
	set: (key: string, value: string) => Promise<any>;
	get: (key: string) => Promise<string | any>;
}
