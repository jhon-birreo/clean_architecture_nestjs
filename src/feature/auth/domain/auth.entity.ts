export class AuthEntity {
	email: string;
	password: string;
	token?: string;
}

export class RefreshTokenEntity {
	email: string;
}
