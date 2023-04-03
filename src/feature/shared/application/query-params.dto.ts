import { IQueryParams } from '@/core/domain/interfaces/query-params.repository';
import { toBoolean, toDate, toNumber } from '@/coreApp/utils/cast';
import { Transform } from 'class-transformer';
import { IsBoolean, IsDate, IsNumber, IsOptional } from 'class-validator';

export class QueryDto implements IQueryParams {
	@Transform(({ value }) => toNumber(value, { default: 0, min: 0 }))
	@IsNumber()
	@IsOptional()
	public skip = 0;

	@Transform(({ value }) => toNumber(value, { default: 5, min: 1 }))
	@IsNumber()
	@IsOptional()
	public take = 5;

	@Transform(({ value }) => toBoolean(value))
	@IsBoolean()
	@IsOptional()
	public isActive = true;

	@Transform(({ value }) => toDate(value))
	@IsDate()
	@IsOptional()
	public toDate: string;

	@Transform(({ value }) => toDate(value))
	@IsDate()
	@IsOptional()
	public fromDate: string;
}
