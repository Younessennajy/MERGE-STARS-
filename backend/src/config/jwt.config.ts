import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  // Use || so that an empty string "" also triggers the fallback.
  secret:
    process.env.JWT_SECRET ||
    'dev-access-secret-change-in-production-min32chars',
  expiresIn: process.env.JWT_EXPIRES_IN || '15m',
  refreshSecret:
    process.env.JWT_REFRESH_SECRET ||
    'dev-refresh-secret-change-in-production-min32chars',
  refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
}));
