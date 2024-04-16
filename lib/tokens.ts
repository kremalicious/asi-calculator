import { tokens } from '@/constants'
import type { TokenAddress, Token } from '@/types'

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
