'use client'

import { tokens } from '@/constants'
import { fetcher } from '@/utils'
import useSWR from 'swr'

export function usePrices(): {
  prices: { ocean: number; fet: number; agix: number; asi: number }
  isValidating: boolean
  isLoading: boolean
} {
  const { data, isValidating, isLoading } = useSWR(
    `/api/prices/?tokens=${tokens.toString()}`,
    fetcher
  )

  const ocean = data?.[tokens[0]]?.usd || 0
  const fet = data?.[tokens[1]]?.usd || 0
  const agix = data?.[tokens[2]]?.usd || 0
  const asi = fet

  return { prices: { ocean, fet, agix, asi }, isValidating, isLoading }
}
