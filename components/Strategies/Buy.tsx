'use client'

import { ratioOceanToAsi, ratioAgixToAsi, ratioFetToAsi } from '@/constants'
import { FormAmount } from '../FormAmount'
import { Result } from '../ResultRow'
import { useState } from 'react'
import { useDebounce } from 'use-debounce'
import styles from './styles.module.css'
import { usePrices } from '@/hooks'

export function Buy() {
  const prices = usePrices()
  const [amountBuy, setAmountBuy] = useState(100)
  const [debouncedAmountBuy] = useDebounce(amountBuy, 500)

  return (
    <div className={styles.results}>
      <h3>
        Buying with $
        <FormAmount amount={amountBuy} setAmount={setAmountBuy} /> right now
        gets you:
      </h3>
      <Result
        tokenSymbol="OCEAN"
        tokenAddress="0x967da4048cd07ab37855c090aaf366e4ce1b9f48"
        amount={prices.ocean ? debouncedAmountBuy / prices.ocean : 0}
        amountAsi={
          prices.ocean
            ? (debouncedAmountBuy / prices.ocean) * ratioOceanToAsi
            : 0
        }
        amountFiat={
          prices.ocean
            ? (debouncedAmountBuy / prices.ocean) * ratioOceanToAsi * prices.asi
            : 0
        }
      />
      <Result
        tokenSymbol="AGIX"
        tokenAddress="0x5b7533812759b45c2b44c19e320ba2cd2681b542"
        amount={prices.agix ? debouncedAmountBuy / prices.agix : 0}
        amountAsi={
          prices.agix ? (debouncedAmountBuy / prices.agix) * ratioAgixToAsi : 0
        }
        amountFiat={
          prices.agix
            ? (debouncedAmountBuy / prices.agix) * ratioAgixToAsi * prices.asi
            : 0
        }
      />
      <Result
        tokenSymbol="FET"
        tokenAddress="0xaea46a60368a7bd060eec7df8cba43b7ef41ad85"
        amount={prices.fet ? debouncedAmountBuy / prices.fet : 0}
        amountAsi={
          prices.fet ? (debouncedAmountBuy / prices.fet) * ratioFetToAsi : 0
        }
        amountFiat={
          prices.fet
            ? (debouncedAmountBuy / prices.fet) * ratioFetToAsi * prices.asi
            : 0
        }
      />
    </div>
  )
}
