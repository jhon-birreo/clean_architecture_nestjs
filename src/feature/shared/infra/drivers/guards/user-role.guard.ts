import { InfrastructureError } from '@/core/application/errors/api.error';
import { META_ROLES } from '@/shared/damain/constant/meta-role.constant';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { UserEntity } from '../../../../user/domain/user.entity';

@Injectable()
export class UserRoleGuard implements CanActivate {
	constructor(private readonly reflector: Reflector) {}
	canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
		const validRoles: string = this.reflector.get(META_ROLES, context.getHandler());
		if (!validRoles) return true;
		if (validRoles.length === 0) return true;

		const req = context.switchToHttp().getRequest();
		const user = req.user as UserEntity;

		if (!user) throw new InfrastructureError({ message: 'User not fopund' });

		for (const role of user.role) {
			if (validRoles.includes(role)) {
				return true;
			}
		}

		throw new InfrastructureError({ message: `User ${user.fullName} need a valid role: [${validRoles}]` });
	}
}
