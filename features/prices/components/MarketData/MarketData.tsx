'use client'

import { ratioOceanToAsi, ratioAgixToAsi, ratioFetToAsi } from '@/constants'
import styles from './MarketData.module.css'
import { usePrices } from '@/features/prices'
import { Badge } from '@/components'

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
            ${prices.asi.usd}
          </span>
        </p>
      </li>
      <li>
        <p>
          1 Fet = {ratioFetToAsi} ASI
          <Badge>fixed</Badge>
        </p>
        <p>
          <span className={`${styles.fiat} ${feedbackClasses}`}>
            ${prices.fet.usd}
          </span>
        </p>
      </li>
      <li>
        <p>
          1 OCEAN ={' '}
          <span title={`${ratioOceanToAsi}`}>{ratioOceanToAsi.toFixed(6)}</span>{' '}
          ASI
          <Badge>fixed</Badge>
        </p>
        <p>
          <span className={`${styles.fiat} ${feedbackClasses}`}>
            ${prices.ocean.usd}
          </span>
        </p>
      </li>
      <li>
        <p>
          1 AGIX ={' '}
          <span title={`${ratioAgixToAsi}`}>{ratioAgixToAsi.toFixed(5)}</span>{' '}
          ASI
          <Badge>fixed</Badge>
        </p>
        <p>
          <span className={`${styles.fiat} ${feedbackClasses}`}>
            ${prices.agix.usd}
          </span>
        </p>
      </li>
    </ul>
  )
}
