import styles from './ResultRow.module.css'
import { formatNumber } from '@/utils'
import { ArrowRightIcon } from '@radix-ui/react-icons'
import { TokenLogo } from '../TokenLogo/TokenLogo'
import { Token } from '@/types'

type Props = {
  token: Token | undefined
  amount: number
  amountAsi: number
  amountFiat: number
  amountOriginalFiat?: number
  isValidating: boolean
}

export function Result({
  token,
  amount,
  amountAsi,
  amountFiat,
  amountOriginalFiat,
  isValidating
}: Props) {
  return (
    <div className={styles.result}>
      <div className={styles.resultLine}>
        <TokenLogo token={token} />

        <span className={isValidating ? 'isValidating' : ''}>
          {formatNumber(amount || 0, token?.symbol || '')}
        </span>

        {amountOriginalFiat ? (
          <span className={styles.fiat}>
            {formatNumber(amountOriginalFiat || 0, 'USD')}
          </span>
        ) : null}
      </div>
      <div className={styles.resultLine}>
        <ArrowRightIcon className={styles.iconArrow} />
        <strong
          title={`${amountAsi}`}
          className={isValidating ? 'isValidating' : ''}
        >
          {formatNumber(amountAsi || 0, 'ASI')}
        </strong>
        <strong
          className={`${styles.fiat} ${isValidating ? 'isValidating' : ''}`}
        >
          {formatNumber(amountFiat || 0, 'USD')}
        </strong>
      </div>
    </div>
  )
}
