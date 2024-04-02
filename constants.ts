import { Token } from '@/types'

export const title = 'ASI Calculator'
export const description =
  'See how much ASI you get for your OCEAN, AGIX, or FET.'

export const ratioOceanToAsi = 0.43322638231018
export const ratioAgixToAsi = 0.43335018345744
export const ratioFetToAsi = 1

export const tokens: Token[] = [
  { symbol: 'OCEAN', address: '0x967da4048cd07ab37855c090aaf366e4ce1b9f48' },
  { symbol: 'FET', address: '0xaea46a60368a7bd060eec7df8cba43b7ef41ad85' },
  { symbol: 'AGIX', address: '0x5b7533812759b45c2b44c19e320ba2cd2681b542' }
]
