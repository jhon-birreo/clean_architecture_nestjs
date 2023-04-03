import { IUuidRepository } from '@/core/domain/interfaces/uuid.repository';
import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';

@Injectable()
export class UuidV4Generator implements IUuidRepository {
	verify(): string {
		return 'verify';
	}
	ramdom(): string {
		return v4();
	}
}
