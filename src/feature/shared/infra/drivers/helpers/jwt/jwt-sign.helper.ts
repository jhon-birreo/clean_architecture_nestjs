import { InfrastructureError } from '@/core/application/errors/api.error';
import { HttpStatus } from '@/core/domain/enum/httpStatus';
import { IJWTSignRepository } from '@/core/domain/interfaces/jwt.repository';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JWTServices implements IJWTSignRepository {
	constructor(private jwtServices: JwtService) {}
	public sign(payload: object): string {
		try {
			return this.jwtServices.sign(payload);
		} catch (error) {
			console.log(error);

			if (error instanceof Error) {
				throw new InfrastructureError({
					statusCode: HttpStatus.NOT_FOUND,
					message: error.message,
				});
			}
		}
	}

	public async verify(token: string): Promise<object> {
		try {
			return this.jwtServices.verify(token);
			// return this.jwtServices.verify(token);
		} catch (error) {
			if (error instanceof Error) {
				throw new InfrastructureError({
					statusCode: HttpStatus.NOT_FOUND,
					message: error.message,
				});
			}
		}
	}
}
