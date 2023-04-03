import { QueryDto } from '../../../feature/shared/application/query-params.dto';
import { BaseEntity } from './base.entity';

export abstract class BaseRepository<TEntity extends BaseEntity> {
	abstract create(data: TEntity): Promise<TEntity>;
	abstract update(id: string, data: Partial<TEntity>): Promise<TEntity>;
	abstract findAll(filter: QueryDto): Promise<TEntity[]>;
	abstract findById(id: string): Promise<TEntity>;
	abstract findOne(filter: Partial<TEntity>): Promise<TEntity>;
	abstract delete(id: string): Promise<void>;
}
