import { api } from '@/lib/axios'
import type { ApiResponse, PaginatedResponse, ApplicationStatus } from '@/shared/types/api.types'
import type { CoinApplication } from '@/features/coins/api/coins.api'

export const adminApi = {
  getApplications: (params?: { status?: ApplicationStatus; page?: number; limit?: number }) =>
    api.get<PaginatedResponse<CoinApplication>>('/admin/applications', { params }),

  getApplication: (id: string) =>
    api.get<ApiResponse<CoinApplication>>(`/admin/applications/${id}`),

  updateStatus: (id: string, status: ApplicationStatus, note?: string) =>
    api.patch<ApiResponse<CoinApplication>>(`/admin/applications/${id}/status`, { status, note }),

  exportCsv: () =>
    api.get('/admin/applications/export', { responseType: 'blob' }),
}
