'use client'

import {
  ratioOceanToAsi,
  ratioAgixToAsi,
  ratioFetToAsi,
  tokens
} from '@/constants'
import { fetcher, formatNumber } from '@/utils'
import { FormAmount } from '../FormAmount'
import { Result } from '../ResultRow'
import styles from './styles.module.css'
import { useState } from 'react'
import useSWR from 'swr'
import { useDebounce } from 'use-debounce'
import { usePrices } from '@/hooks'

export function Swap() {
  const prices = usePrices()
  const [amountSwap, setAmountSwap] = useState(100)
  const [debouncedAmountSwap] = useDebounce(amountSwap, 500)

  const { data: dataSwapOceanToAgix } = useSWR(
    `/api/quote/?tokenIn=${tokens[0]}&tokenOut=${tokens[2]}&amountIn=${debouncedAmountSwap}`,
    fetcher
  )

  const { data: dataSwapOceanToFet } = useSWR(
    `/api/quote/?tokenIn=${tokens[0]}&tokenOut=${tokens[1]}&amountIn=${debouncedAmountSwap}`,
    fetcher
  )

  return (
    <div className={styles.results}>
      <h3>
        Swapping <FormAmount amount={amountSwap} setAmount={setAmountSwap} />{' '}
        OCEAN ({formatNumber(debouncedAmountSwap * prices.ocean, 'USD')}) right
        now gets you:
      </h3>

      <Result
        tokenSymbol="OCEAN"
        tokenAddress="0x967da4048cd07ab37855c090aaf366e4ce1b9f48"
        amount={debouncedAmountSwap}
        amountAsi={debouncedAmountSwap * ratioOceanToAsi}
        amountFiat={debouncedAmountSwap * ratioOceanToAsi * prices.asi}
      />

      <Result
        tokenSymbol="AGIX"
        tokenAddress="0x5b7533812759b45c2b44c19e320ba2cd2681b542"
        amount={
          dataSwapOceanToAgix?.amountOut /
            Number(`1e${dataSwapOceanToAgix?.decimals}`) || 0
        }
        amountAsi={
          (dataSwapOceanToAgix?.amountOut /
            Number(`1e${dataSwapOceanToAgix?.decimals}`) || 0) * ratioAgixToAsi
        }
        amountFiat={
          (dataSwapOceanToAgix?.amountOut /
            Number(`1e${dataSwapOceanToAgix?.decimals}`) || 0) *
          ratioAgixToAsi *
          prices.asi
        }
      />

      <Result
        tokenSymbol="FET"
        tokenAddress="0xaea46a60368a7bd060eec7df8cba43b7ef41ad85"
        amount={
          dataSwapOceanToFet?.amountOut /
            Number(`1e${dataSwapOceanToFet?.decimals}`) || 0
        }
        amountAsi={
          (dataSwapOceanToFet?.amountOut /
            Number(`1e${dataSwapOceanToFet?.decimals}`) || 0) * ratioFetToAsi
        }
        amountFiat={
          (dataSwapOceanToFet?.amountOut /
            Number(`1e${dataSwapOceanToFet?.decimals}`) || 0) * prices.asi
        }
      />
    </div>
  )
}
