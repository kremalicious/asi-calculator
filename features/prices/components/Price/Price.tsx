import styles from './Price.module.css'
import { usePrices } from '@/features/prices'
import { PriceChange } from './PriceChange'

export function Price({
  price,
  priceChange
}: {
  price: number
  priceChange?: number
}) {
  const { isValidating, isLoading } = usePrices()

  const feedbackClasses = isLoading
    ? 'isLoading'
    : isValidating
      ? 'isValidating'
      : ''

  return (
    <p className={styles.price}>
      <span className={`${styles.fiat} ${feedbackClasses}`}>${price} </span>
      {priceChange ? <PriceChange priceChange={priceChange} /> : null}
    </p>
  )
}
