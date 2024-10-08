import { type PriceCoingecko, useLocale, usePrices } from '@/features/prices'
import { formatFiat } from '@/lib'
import styles from './Price.module.css'
import { PriceChange } from './PriceChange'

export function Price({ price }: { price: PriceCoingecko }) {
  const { isValidating, isLoading } = usePrices()
  const locale = useLocale()

  const feedbackClasses = isLoading
    ? 'isLoading'
    : isValidating
      ? 'isValidating'
      : ''

  return (
    <p className={styles.price}>
      <span className={`${styles.fiat} ${feedbackClasses}`}>
        {formatFiat(price?.usd, 'USD', locale)}
      </span>
      {price?.usd_24h_change ? (
        <PriceChange priceChange={price.usd_24h_change} />
      ) : null}
    </p>
  )
}
