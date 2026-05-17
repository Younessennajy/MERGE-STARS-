import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '@/features/auth/store/auth.store'
import { ROUTES } from '@/router/routes'
import type { Role } from '@/shared/types/api.types'

interface RoleGuardProps {
  allowedRoles: Role[]
}

export default function RoleGuard({ allowedRoles }: RoleGuardProps) {
  const user = useAuthStore((s) => s.user)
  const hasRole = user?.roles.some((r) => allowedRoles.includes(r))
  if (!hasRole) return <Navigate to={ROUTES.DASHBOARD} replace />
  return <Outlet />
}
