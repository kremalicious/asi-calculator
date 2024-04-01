'use client'

import { ratioOceanToAsi, ratioAgixToAsi, ratioFetToAsi } from '@/constants'
import styles from './MarketData.module.css'
import { usePrices } from '@/features/prices'
import { Label } from '@/components'

export function MarketData() {
  const { prices, isValidating, isLoading } = usePrices()

  const feedbackClasses = isLoading
    ? 'isLoading'
    : isValidating
    ? 'isValidating'
    : ''

  return (
    <ul className={styles.marketData}>
      <li>
        <p>1 ASI</p>
        <p>
          <span className={`${styles.fiat} ${feedbackClasses}`}>
            ${prices.asi}
          </span>
        </p>
      </li>
      <li>
        <p>
          1 Fet = {ratioFetToAsi} ASI
          <Label>fixed</Label>
        </p>
        <p>
          <span className={`${styles.fiat} ${feedbackClasses}`}>
            ${prices.fet}
          </span>
        </p>
      </li>
      <li>
        <p>
          1 OCEAN = {ratioOceanToAsi} ASI
          <Label>fixed</Label>
        </p>
        <p>
          <span className={`${styles.fiat} ${feedbackClasses}`}>
            ${prices.ocean}
          </span>
        </p>
      </li>
      <li>
        <p>
          1 AGIX = {ratioAgixToAsi} ASI
          <Label>fixed</Label>
        </p>
        <p>
          <span className={`${styles.fiat} ${feedbackClasses}`}>
            ${prices.agix}
          </span>
        </p>
      </li>
    </ul>
  )
}
