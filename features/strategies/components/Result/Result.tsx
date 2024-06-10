import styles from './Result.module.css'
import { formatCrypto, formatFiat } from '@/lib'
import { ArrowRightIcon } from '@radix-ui/react-icons'
import { TokenLogo } from '@/components'
import { Token } from '@/types'
import { useLocale } from '@/features/prices'

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
  const locale = useLocale()
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
          <span
            className={feedbackClasses}
            title={`${amount} ${token?.symbol}`}
          >
            {formatCrypto(amount || 0, token?.symbol || '', locale)}
          </span>
        </p>

        {amountOriginalFiat ? (
          <p>
            <span className={`${styles.fiat} ${feedbackClasses}`}>
              {formatFiat(amountOriginalFiat || 0, 'USD', locale)}
            </span>
          </p>
        ) : null}
      </div>

      <div className={styles.resultLine}>
        <TokenLogo token={{ symbol: 'ASI', address: '0x' }} />

        <p>
          <strong title={`${amountAsi} ASI`} className={feedbackClasses}>
            {formatCrypto(amountAsi || 0, 'ASI', locale)}
          </strong>
        </p>
        <p>
          <strong className={`${styles.fiat} ${feedbackClasses}`}>
            {formatFiat(amountFiat || 0, 'USD', locale)}
          </strong>
        </p>
      </div>
    </div>
  )
}
