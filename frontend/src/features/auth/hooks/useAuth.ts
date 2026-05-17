import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { authApi } from '../api/auth.api'
import { useAuthStore } from '../store/auth.store'
import { ROUTES } from '@/router/routes'
import type { LoginPayload } from '../types'

export function useLogin() {
  const setSession = useAuthStore((s) => s.setSession)
  const navigate   = useNavigate()

  return useMutation({
    mutationFn: (payload: LoginPayload) => authApi.login(payload),
    onSuccess: ({ data }) => {
      // user info comes from /users/me after login
      setSession(data.data.accessToken, null as never)
      navigate(ROUTES.DASHBOARD)
    },
  })
}

export function useLogout() {
  const clearSession = useAuthStore((s) => s.clearSession)
  const navigate     = useNavigate()

  return () => {
    authApi.logout().finally(() => {
      clearSession()
      navigate(ROUTES.LOGIN)
    })
  }
}
