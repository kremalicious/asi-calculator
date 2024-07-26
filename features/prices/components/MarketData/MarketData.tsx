'use client'

import { Badge } from '@/components'
import { ratioAgixToAsi, ratioFetToAsi, ratioOceanToAsi } from '@/constants'
import { Price, usePrices } from '@/features/prices'
import styles from './MarketData.module.css'

export function MarketData() {
  const { prices } = usePrices()

  return (
    <ul className={styles.marketData}>
      <li>
        <p>1 ASI</p>
        <Price price={prices.asi} />
      </li>
      <li>
        <p>
          1 Fet = {ratioFetToAsi} ASI
          <Badge>fixed</Badge>
        </p>
        <Price price={prices.fet} />
      </li>
      <li>
        <p>
          1 OCEAN ={' '}
          <span title={`${ratioOceanToAsi}`}>{ratioOceanToAsi.toFixed(6)}</span>{' '}
          ASI
          <Badge>fixed</Badge>
        </p>
        <Price price={prices.ocean} />
      </li>
      <li>
        <p>
          1 AGIX ={' '}
          <span title={`${ratioAgixToAsi}`}>{ratioAgixToAsi.toFixed(5)}</span>{' '}
          ASI
          <Badge>fixed</Badge>
        </p>
        <Price price={prices.agix} />
      </li>
    </ul>
  )
}
