import { ValidRoles } from '@/shared/damain/enums/valis-roles.enum';
import { UserRoleGuard } from '@/shared/infra/drivers/guards/user-role.guard';
import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RoleProtected } from './role-protected.decorator';

export function Auth(...roles: ValidRoles[]) {
	return applyDecorators(RoleProtected(...roles), UseGuards(AuthGuard(), UserRoleGuard));
}
