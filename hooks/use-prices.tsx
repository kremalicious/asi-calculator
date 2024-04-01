import { tokens } from '@/constants'
import { fetcher, getTokenAddressBySymbol } from '@/lib/utils'
import useSWR from 'swr'

const tokenAddresses = tokens.map((token) => token.address).toString()

export function usePrices(): {
  prices: { ocean: number; fet: number; agix: number; asi: number }
  isValidating: boolean
  isLoading: boolean
} {
  const { data, isValidating, isLoading } = useSWR(
    `/api/prices/?tokens=${tokenAddresses}`,
    fetcher
  )

  const oceanAddress = getTokenAddressBySymbol('OCEAN')
  const fetAddress = getTokenAddressBySymbol('FET')
  const agixAddress = getTokenAddressBySymbol('AGIX')

  if (!oceanAddress || !fetAddress || !agixAddress)
    return {
      prices: { ocean: 0, fet: 0, agix: 0, asi: 0 },
      isValidating,
      isLoading
    }

  const ocean = data?.[oceanAddress]?.usd || 0
  const fet = data?.[fetAddress]?.usd || 0
  const agix = data?.[agixAddress]?.usd || 0
  const asi = fet

  return { prices: { ocean, fet, agix, asi }, isValidating, isLoading }
}
