'use client'

import { tokens } from '@/constants'
import { fetcher, getTokenAddressBySymbol } from '@/lib'
import useSWR from 'swr'

const tokenAddresses = tokens.map((token) => token.address).toString()

export type PriceCoingecko = {
  usd: number
  usd_24h_change: number
}

export type Prices = {
  ocean: PriceCoingecko
  fet: PriceCoingecko
  agix: PriceCoingecko
  cudos: PriceCoingecko
  asi: PriceCoingecko
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
  const cudosAddress = getTokenAddressBySymbol('CUDOS')

  if (!data || !oceanAddress || !fetAddress || !agixAddress || !cudosAddress)
    return {
      prices: {
        ocean: { usd: 0, usd_24h_change: 0 },
        fet: { usd: 0, usd_24h_change: 0 },
        agix: { usd: 0, usd_24h_change: 0 },
        cudos: { usd: 0, usd_24h_change: 0 },
        asi: { usd: 0, usd_24h_change: 0 }
      },
      isValidating,
      isLoading
    }

  const ocean = data[oceanAddress]
  const fet = data[fetAddress]
  const agix = data[agixAddress]
  const cudos = data[cudosAddress]
  const asi = fet

  return { prices: { ocean, fet, agix, cudos, asi }, isValidating, isLoading }
}
