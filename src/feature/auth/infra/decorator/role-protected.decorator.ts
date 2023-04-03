import { META_ROLES } from '@/shared/damain/constant/meta-role.constant';
import { ValidRoles } from '@/shared/damain/enums/valis-roles.enum';
import { SetMetadata } from '@nestjs/common';

export const RoleProtected = (...args: ValidRoles[]) => {
	return SetMetadata(META_ROLES, args);
};
