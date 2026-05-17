export interface ApiResponse<T> {
  data: T
  meta: {
    timestamp: string
    version: string
  }
}

export interface PaginatedResponse<T> {
  data: T[]
  meta: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface ApiError {
  error: {
    code: string
    message: string
    statusCode: number
  }
}

export type ApplicationStatus =
  | 'submitted'
  | 'under_review'
  | 'sent_to_crystal'
  | 'approved'
  | 'rejected'
  | 'funds_received'
  | 'production_queue'
  | 'in_production'
  | 'quality_check'
  | 'ready'
  | 'delivered'

export type Metal = 'gold' | 'silver' | 'platinum' | 'palladium'

export type Role = 'admin' | 'manager' | 'developer' | 'user'
