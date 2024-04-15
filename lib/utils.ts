import { tokens } from '@/constants'
import type { TokenAddress, Token } from '@/types'
import { formatCurrency } from '@coingecko/cryptoformat'

export function formatCrypto(price: number, currency: string, locale: string) {
  return formatCurrency(price, currency, locale, false, {
    decimalPlaces: 3,
    significantFigures: 1
  })
}

export function formatFiat(price: number, currency: string, locale: string) {
  return formatCurrency(price, currency, locale, false, {
    decimalPlaces: 2,
    significantFigures: 4
  })
}

export async function fetcher(url: string) {
  const res = await fetch(url)
  if (!res.ok) throw new Error('Failed to fetch')
  return await res.json()
}

export function getTokenBySymbol(symbol: string): Token | undefined {
  const token = tokens.find((t) => t.symbol === symbol)
  return token
}

export function getTokenAddressBySymbol(
  symbol: string
): TokenAddress | undefined {
  const token = getTokenBySymbol(symbol)
  return token?.address
}
