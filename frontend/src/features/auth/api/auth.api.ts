import { api } from '@/lib/axios'
import type { LoginPayload, RegisterStep1Payload, AuthTokens } from '../types'
import type { ApiResponse } from '@/shared/types/api.types'

export const authApi = {
  login: (payload: LoginPayload) =>
    api.post<ApiResponse<AuthTokens>>('/auth/login', payload),

  register: (step1: RegisterStep1Payload) =>
    api.post('/auth/register', step1),

  sendVerificationCode: (phone: string) =>
    api.post('/auth/send-code', { phone }),

  refresh: () =>
    api.post<ApiResponse<AuthTokens>>('/auth/refresh'),

  logout: () =>
    api.post('/auth/logout'),
}
