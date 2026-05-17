import { api } from '@/lib/axios'
import type { ApiResponse, PaginatedResponse } from '@/shared/types/api.types'

export interface CoinApplication {
  id: string
  coinType: string
  quantity: number
  metalPurity: number
  coinValue: number
  status: string
  submittedAt: string
}

export const coinsApi = {
  getApplications: () =>
    api.get<PaginatedResponse<CoinApplication>>('/coins/applications'),

  getApplication: (id: string) =>
    api.get<ApiResponse<CoinApplication>>(`/coins/applications/${id}`),

  submitApplication: (payload: Omit<CoinApplication, 'id' | 'status' | 'submittedAt'>) =>
    api.post<ApiResponse<CoinApplication>>('/coins/applications', payload),
}
