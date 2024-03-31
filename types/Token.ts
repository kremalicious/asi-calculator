export type TokenSymbol = 'OCEAN' | 'FET' | 'AGIX' | 'ASI'
export type TokenAddress = `0x${string}`

export type Token = {
  symbol: TokenSymbol
  address: `0x${string}`
}
