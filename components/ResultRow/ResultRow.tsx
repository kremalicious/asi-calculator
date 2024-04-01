import styles from './ResultRow.module.css'
import { formatNumber } from '@/lib/utils'
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
  isLoading: boolean
}

export function Result({
  token,
  amount,
  amountAsi,
  amountFiat,
  amountOriginalFiat,
  isValidating,
  isLoading
}: Props) {
  const feedbackClasses = isLoading
    ? 'isLoading'
    : isValidating
    ? 'isValidating'
    : ''

  return (
    <div className={styles.result}>
      <div className={styles.resultLine}>
        <TokenLogo token={token} />

        <p>
          <span className={feedbackClasses}>
            {formatNumber(amount || 0, token?.symbol || '')}
          </span>
        </p>

        {amountOriginalFiat ? (
          <p>
            <span className={`${styles.fiat} ${feedbackClasses}`}>
              {formatNumber(amountOriginalFiat || 0, 'USD')}
            </span>
          </p>
        ) : null}
      </div>

      <div className={styles.resultLine}>
        <ArrowRightIcon className={styles.iconArrow} />

        <p>
          <strong title={`${amountAsi}`} className={feedbackClasses}>
            {formatNumber(amountAsi || 0, 'ASI')}
          </strong>
        </p>
        <p>
          <strong className={`${styles.fiat} ${feedbackClasses}`}>
            {formatNumber(amountFiat || 0, 'USD')}
          </strong>
        </p>
      </div>
    </div>
  )
}
