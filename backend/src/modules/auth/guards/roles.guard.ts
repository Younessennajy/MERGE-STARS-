import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

/**
 * Checks that the authenticated user has at least one of the roles
 * declared via @Roles(). Must be used after JwtAuthGuard.
 */
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles || requiredRoles.length === 0) return true;

    const request = context.switchToHttp().getRequest();
    const user: JwtPayload = request.user;

    if (!user?.roles) throw new ForbiddenException();

    const hasRole = requiredRoles.some((required) =>
      user.roles.includes(required),
    );

    if (!hasRole) throw new ForbiddenException('Insufficient permissions.');

    return true;
  }
}
