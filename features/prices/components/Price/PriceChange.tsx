'use client'

import { TriangleUpIcon, TriangleDownIcon } from '@radix-ui/react-icons'
import styles from './PriceChange.module.css'
import { useEffect, useState } from 'react'

export function PriceChange({ priceChange }: { priceChange: number }) {
  const [locale, setLocale] = useState('en-US')
  const styleClasses = priceChange > 0 ? styles.positive : styles.negative

  useEffect(() => {
    const userLocale = navigator?.languages?.length
      ? navigator.languages[0]
      : navigator.language
    setLocale(userLocale)
  }, [])

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
