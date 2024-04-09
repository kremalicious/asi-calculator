'use client'

import { ratioOceanToAsi, ratioAgixToAsi, ratioFetToAsi } from '@/constants'
import styles from './MarketData.module.css'
import { usePrices } from '@/features/prices'
import { Badge } from '@/components'
import { Price } from '../Price'

export function MarketData() {
  const { prices } = usePrices()

  return (
    <ul className={styles.marketData}>
      <li>
        <p>1 ASI</p>
        <Price price={prices.asi.usd} priceChange={prices.asi.usd_24h_change} />
      </li>
      <li>
        <p>
          1 Fet = {ratioFetToAsi} ASI
          <Badge>fixed</Badge>
        </p>
        <Price price={prices.fet.usd} priceChange={prices.fet.usd_24h_change} />
      </li>
      <li>
        <p>
          1 OCEAN ={' '}
          <span title={`${ratioOceanToAsi}`}>{ratioOceanToAsi.toFixed(6)}</span>{' '}
          ASI
          <Badge>fixed</Badge>
        </p>
        <Price
          price={prices.ocean.usd}
          priceChange={prices.ocean.usd_24h_change}
        />
      </li>
      <li>
        <p>
          1 AGIX ={' '}
          <span title={`${ratioAgixToAsi}`}>{ratioAgixToAsi.toFixed(5)}</span>{' '}
          ASI
          <Badge>fixed</Badge>
        </p>
        <Price
          price={prices.agix.usd}
          priceChange={prices.agix.usd_24h_change}
        />
      </li>
    </ul>
  )
}
