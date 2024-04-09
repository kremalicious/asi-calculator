'use client'

import { tokens } from '@/constants'
import { fetcher, getTokenAddressBySymbol } from '@/lib/utils'
import useSWR from 'swr'

const tokenAddresses = tokens.map((token) => token.address).toString()

export type Prices = {
  ocean: {
    usd: number
    usd_24h_change: number
  }
  fet: {
    usd: number
    usd_24h_change: number
  }
  agix: {
    usd: number
    usd_24h_change: number
  }
  asi: {
    usd: number
    usd_24h_change: number
  }
}

export function usePrices(): {
  prices: Prices
  isValidating: boolean
  isLoading: boolean
} {
  const { data, isValidating, isLoading } = useSWR(
    `/api/prices?tokens=${tokenAddresses}`,
    fetcher
  )

  const oceanAddress = getTokenAddressBySymbol('OCEAN')
  const fetAddress = getTokenAddressBySymbol('FET')
  const agixAddress = getTokenAddressBySymbol('AGIX')

  if (!data || !oceanAddress || !fetAddress || !agixAddress)
    return {
      prices: {
        ocean: { usd: 0, usd_24h_change: 0 },
        fet: { usd: 0, usd_24h_change: 0 },
        agix: { usd: 0, usd_24h_change: 0 },
        asi: { usd: 0, usd_24h_change: 0 }
      },
      isValidating,
      isLoading
    }

  const ocean = data[oceanAddress]
  const fet = data[fetAddress]
  const agix = data[agixAddress]
  const asi = fet

  return { prices: { ocean, fet, agix, asi }, isValidating, isLoading }
}
