import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '@/features/auth/store/auth.store'
import { ROUTES } from '@/router/routes'

export default function AuthGuard() {
  const token = useAuthStore((s) => s.accessToken)
  if (!token) return <Navigate to={ROUTES.LOGIN} replace />
  return <Outlet />
}
