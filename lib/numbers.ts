import { formatCurrency } from '@coingecko/cryptoformat'

export function formatCrypto(price: number, currency: string, locale: string) {
  return formatCurrency(price, currency, locale, false, {
    decimalPlaces: 3,
    significantFigures: 5
  })
}

export function formatFiat(price: number, currency: string, locale: string) {
  let formattedPrice = formatCurrency(price, currency, locale, false, {
    decimalPlaces: price < 1 ? 6 : 2,
    significantFigures: 8
  })

  // Add a trailing zero if only one digit after the decimal
  if (formattedPrice.includes('.') && formattedPrice.split('.')[1].length < 2) {
    formattedPrice += '0'
  }

  return formattedPrice
}
