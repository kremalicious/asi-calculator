'use client'

import { ratioOceanToAsi, ratioAgixToAsi, ratioFetToAsi } from '@/constants'
import styles from './CalculationBase.module.css'
import { usePrices } from '@/hooks'
import { Label } from '../Label'

export function CalculationBase() {
  const { prices, isValidating } = usePrices()

  return (
    <ul className={styles.calculationBase}>
      <li>
        <p>1 ASI</p>
        <p className={isValidating ? 'isValidating' : ''}>= ${prices.asi}</p>
      </li>
      <li>
        <p>
          1 Fet = {ratioFetToAsi} ASI
          <Label>fixed</Label>
        </p>
        <p className={isValidating ? 'isValidating' : ''}>= ${prices.fet}</p>
      </li>
      <li>
        <p>
          1 OCEAN = {ratioOceanToAsi} ASI
          <Label>fixed</Label>
        </p>
        <p className={isValidating ? 'isValidating' : ''}>= ${prices.ocean}</p>
      </li>
      <li>
        <p>
          1 AGIX = {ratioAgixToAsi} ASI
          <Label>fixed</Label>
        </p>
        <p className={isValidating ? 'isValidating' : ''}>= ${prices.agix}</p>
      </li>
    </ul>
  )
}
