export interface returnVerifyToken {
	uuid: string;
}
export interface IJWTSignRepository {
	sign: (payload: object) => string;
	verify: (payload: string) => Promise<object | any>;
}
