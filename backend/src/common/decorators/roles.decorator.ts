import { SetMetadata } from '@nestjs/common';
import { Role } from '../enums/role.enum';

export const ROLES_KEY = 'roles';

/** Attach required roles to a route or controller. */
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
