export enum Role {
  Admin = 'admin',
  Manager = 'manager',
  Developer = 'developer',
  User = 'user',
}

/**
 * Numeric weight for each role — used for hierarchy comparisons.
 * Higher number = more privileged.
 */
export const ROLE_WEIGHT: Record<Role, number> = {
  [Role.Admin]: 4,
  [Role.Manager]: 3,
  [Role.Developer]: 2,
  [Role.User]: 1,
};
