'use client'

import { ratioOceanToAsi, ratioAgixToAsi, ratioFetToAsi } from '@/constants'
import styles from './CalculationBase.module.css'
import { usePrices } from '@/hooks'

export function CalculationBase() {
  const prices = usePrices()

  return (
    <ul className={styles.calculationBase}>
      <li>
        1 ASI
        <br />= ${prices.asi}
      </li>
      <li>
        1 Fet = {ratioFetToAsi} ASI
        <span className={styles.label}>fixed</span>
        <br />= ${prices.fet}
      </li>
      <li>
        1 OCEAN = {ratioOceanToAsi} ASI
        <span className={styles.label}>fixed</span>
        <br />= ${prices.ocean}
      </li>
      <li>
        1 AGIX = {ratioAgixToAsi} ASI
        <span className={styles.label}>fixed</span>
        <br />= ${prices.agix}
      </li>
    </ul>
  )
}
