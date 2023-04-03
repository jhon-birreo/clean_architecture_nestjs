import { InfrastructureError } from '@/core/application/errors/api.error';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator((data: string, ctx: ExecutionContext) => {
	const req = ctx.switchToHttp().getRequest();
	const user = req.user;

	if (!user) throw new InfrastructureError({ message: 'User not foud in (request)' });

	return !data ? user : user[data];
});
