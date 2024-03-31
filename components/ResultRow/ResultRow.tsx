import styles from './ResultRow.module.css'
import { formatNumber } from '@/utils'
import { ArrowRightIcon } from '@radix-ui/react-icons'
import Image from 'next/image'

type Props = {
  tokenSymbol: string
  tokenAddress: string
  amount: number
  amountAsi: number
  amountFiat: number
  amountOriginalFiat?: number
  isValidating: boolean
}

export function Result({
  tokenSymbol,
  tokenAddress,
  amount,
  amountAsi,
  amountFiat,
  amountOriginalFiat,
  isValidating
}: Props) {
  return (
    <div className={styles.result}>
      <div className={styles.resultLine}>
        <span className={styles.logo} data-symbol={tokenSymbol}>
          <Image
            src={`https://tokens.1inch.io/${tokenAddress}.png`}
            width={24}
            height={24}
            alt={tokenSymbol}
          />
        </span>

        <span className={isValidating ? 'isValidating' : ''}>
          {formatNumber(amount || 0, tokenSymbol)}
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
