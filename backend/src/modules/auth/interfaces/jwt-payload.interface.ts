import { Role } from '../../../common/enums/role.enum';

export interface JwtPayload {
  /** User UUID */
  sub: string;
  roles: Role[];
  region: string;
  iat?: number;
  exp?: number;
}

/** Extended payload attached to req.user by RefreshTokenStrategy */
export interface RefreshTokenPayload extends JwtPayload {
  refreshToken: string;
}
