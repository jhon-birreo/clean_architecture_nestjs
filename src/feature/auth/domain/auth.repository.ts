import { AuthEntity } from './auth.entity';

export abstract class AuthRepository {
	abstract signIn(data: AuthEntity): Promise<AuthEntity>;
	abstract signOut(data: AuthEntity): Promise<AuthEntity>;
}
