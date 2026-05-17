import { api } from '@/lib/axios'
import type { ApiResponse } from '@/shared/types/api.types'

export interface Investment {
  id: string
  amountUsd: number
  applicationId: string
  createdAt: string
}

export interface InvestmentSummary {
  totalUsd: number
  changePct: number
}

export const investmentsApi = {
  getAll: () =>
    api.get<ApiResponse<Investment[]>>('/investments'),

  getSummary: () =>
    api.get<ApiResponse<InvestmentSummary>>('/investments/summary'),
}
