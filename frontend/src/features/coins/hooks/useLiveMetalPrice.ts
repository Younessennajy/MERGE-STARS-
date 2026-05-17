import { useState } from 'react'
import { useWebSocket } from '@/shared/hooks/useWebSocket'
import type { Metal } from '@/shared/types/api.types'

interface MetalPrice {
  metal: Metal
  priceUsd: number
  changePct: number
}

export function useLiveMetalPrices() {
  const [prices, setPrices] = useState<MetalPrice[]>([])

  useWebSocket<MetalPrice[]>('metals:prices', (payload) => {
    setPrices(payload)
  })

  return prices
}
