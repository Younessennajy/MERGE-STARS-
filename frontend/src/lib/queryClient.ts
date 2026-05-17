import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime:   60_000,       // 1 minute
      retry: (count, error: unknown) => {
        const status = (error as { response?: { status: number } })?.response?.status
        if (status === 401 || status === 403) return false
        return count < 2
      },
    },
    mutations: {
      retry: false,
    },
  },
})
