import { formatCurrency } from '@coingecko/cryptoformat'
import styles from './Result.module.css'

type Props = {
  symbol: string
  amount: number
  amountAsi: number
  amountFiat: number
}

function formatPrice(price: number, currency: string) {
  return formatCurrency(price, currency, 'en', false, {
    decimalPlaces: 3,
    significantFigures: 5
  })
}

export function Result({ symbol, amount, amountAsi, amountFiat }: Props) {
  return (
    <div className={styles.result}>
      <p>
        {formatPrice(amount, symbol)} →{' '}
        <strong title={`${amountAsi}`}>{formatPrice(amountAsi, 'ASI')}</strong>
      </p>
      <p>
        = <strong>{formatPrice(amountFiat, 'USD')}</strong>
      </p>
    </div>
  )
}
