import { formatCurrency } from '@coingecko/cryptoformat'

export function formatNumber(price: number, currency: string) {
  return formatCurrency(price, currency, 'en', false, {
    decimalPlaces: 3,
    significantFigures: 5
  })
}

export async function fetcher(url: string) {
  const res = await fetch(url)
  if (!res.ok) throw new Error('Failed to fetch')
  return await res.json()
}
