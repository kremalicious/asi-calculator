import styles from './ResultRow.module.css'
import { formatNumber } from '@/utils'
import Image from 'next/image'

type Props = {
  tokenSymbol: string
  tokenAddress: string
  amount: number
  amountAsi: number
  amountFiat: number
}

export function Result({
  tokenSymbol,
  tokenAddress,
  amount,
  amountAsi,
  amountFiat
}: Props) {
  return (
    <div className={styles.result}>
      <p>
        <span className={styles.logo} data-symbol={tokenSymbol}>
          <Image
            src={`https://tokens.1inch.io/${tokenAddress}.png`}
            width={24}
            height={24}
            alt={tokenSymbol}
          />
        </span>

        {formatNumber(amount || 0, tokenSymbol)}
      </p>
      <p className={styles.conversion}>
        →{' '}
        <strong title={`${amountAsi}`}>
          {formatNumber(amountAsi || 0, 'ASI')}
        </strong>{' '}
        = <strong>{formatNumber(amountFiat || 0, 'USD')}</strong>
      </p>
    </div>
  )
}
