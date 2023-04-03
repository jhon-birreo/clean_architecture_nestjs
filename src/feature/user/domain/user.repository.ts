import { BaseRepository } from '@/core/domain/base/base.repository';
import { UserEntity } from './user.entity';

export abstract class UserRepository extends BaseRepository<UserEntity> {}
