import { TriangleUpIcon, TriangleDownIcon } from '@radix-ui/react-icons'
import styles from './PriceChange.module.css'

export function PriceChange({ priceChange }: { priceChange: number }) {
  const styleClasses = priceChange > 0 ? styles.positive : styles.negative

  return (
    <span className={`${styles.change} ${styleClasses}`} title="24h change">
      {priceChange > 0 ? <TriangleUpIcon /> : <TriangleDownIcon />}
      {Math.abs(priceChange).toFixed(1)}%
    </span>
  )
}
