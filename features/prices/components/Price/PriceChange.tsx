'use client'

import { TriangleUpIcon, TriangleDownIcon } from '@radix-ui/react-icons'
import styles from './PriceChange.module.css'
import { useLocale } from '../../hooks/use-locale'

export function PriceChange({ priceChange }: { priceChange: number }) {
  const locale = useLocale()
  const styleClasses = priceChange > 0 ? styles.positive : styles.negative

  return (
    <span
      className={`${styles.change} ${styleClasses}`}
      title="24h change"
      data-locale={locale}
    >
      {priceChange > 0 ? <TriangleUpIcon /> : <TriangleDownIcon />}
      {Math.abs(priceChange).toFixed(1)}%
    </span>
  )
}
