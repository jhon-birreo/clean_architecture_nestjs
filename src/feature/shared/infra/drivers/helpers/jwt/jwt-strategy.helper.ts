import { envConfig } from '@/core/config/env.config';
import { JWTPayload } from '@/shared/damain/interfaces/jwt-payload.interface';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserEntity } from '../../../../../user/domain/user.entity';
import { UserTypeormRepository } from '../../../../../user/infra/data/typeorm/user-typeorm.repository';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly userRepository: UserTypeormRepository) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: envConfig().JWT_SECRET,
		});
	}

	async validate(payload: JWTPayload): Promise<UserEntity> {
		const { id } = payload;
		const user = await this.userRepository.findOne({ id });
		if (!user) throw new UnauthorizedException('Token not valid');

		if (!user.isActive) throw new UnauthorizedException('User inactive, talk with an admin');
		return user;
	}
}
