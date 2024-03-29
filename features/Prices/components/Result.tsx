import styles from './Result.module.css'
import { formatNumber } from '../utils'

type Props = {
  symbol: string
  amount: number
  amountAsi: number
  amountFiat: number
}

export function Result({ symbol, amount, amountAsi, amountFiat }: Props) {
  return (
    <div className={styles.result}>
      <p>{formatNumber(amount, symbol)}</p>
      <p>
        →{' '}
        <strong title={`${amountAsi}`}>{formatNumber(amountAsi, 'ASI')}</strong>{' '}
        = <strong>{formatNumber(amountFiat, 'USD')}</strong>
      </p>
    </div>
  )
}
