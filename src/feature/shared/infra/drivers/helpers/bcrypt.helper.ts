import { InfrastructureError } from '@/core/application/errors/api.error';
import { HttpStatus } from '@/core/domain/enum/httpStatus';
import { IBcryptRepository } from '@/core/domain/interfaces/bcrypt.repository';
import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';

@Injectable()
export class Bcript implements IBcryptRepository {
	async hash(value: string): Promise<string | any> {
		try {
			const salt = await bcrypt.genSalt(10);
			return await bcrypt.hashSync(value, salt);
		} catch (error) {
			if (error instanceof Error) {
				throw new InfrastructureError({
					statusCode: HttpStatus.BAD_REQUEST,
					message: error.message,
				});
			}
		}
	}

	async compare(value: string, hash: string): Promise<boolean | any> {
		try {
			return await bcrypt.compareSync(value, hash);
		} catch (error) {
			if (error instanceof Error) {
				throw new InfrastructureError({
					statusCode: HttpStatus.BAD_REQUEST,
					message: error.message,
				});
			}
		}
	}
}
