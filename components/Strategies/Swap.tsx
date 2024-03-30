'use client'

import {
  ratioOceanToAsi,
  ratioAgixToAsi,
  ratioFetToAsi,
  tokens
} from '@/constants'
import { fetcher, formatNumber } from '@/utils'
import { Result } from '@/components/ResultRow'
import stylesShared from './styles.module.css'
import { useState } from 'react'
import useSWR from 'swr'
import { useDebounce } from 'use-debounce'
import { usePrices } from '@/hooks'
import { FormAmount, type Token } from '@/components/FormAmount'

export function Swap() {
  const prices = usePrices()
  const [amount, setAmount] = useState(100)
  const [debouncedAmount] = useDebounce(amount, 500)
  const [token, setToken] = useState<Token>('ocean')

  const { data: dataSwapOceanToAgix } = useSWR(
    `/api/quote/?tokenIn=${tokens[0]}&tokenOut=${tokens[2]}&amountIn=${debouncedAmount}`,
    fetcher
  )

  const { data: dataSwapOceanToFet } = useSWR(
    `/api/quote/?tokenIn=${tokens[0]}&tokenOut=${tokens[1]}&amountIn=${debouncedAmount}`,
    fetcher
  )

  return (
    <div className={stylesShared.results}>
      <h3 className={stylesShared.title}>
        Swapping{' '}
        <FormAmount
          amount={amount}
          token={token}
          setAmount={setAmount}
          // setToken={setToken}
        />{' '}
        ({formatNumber(amount * prices[token || 'ocean'], 'USD')}) right now
        gets you:
      </h3>

      <Result
        tokenSymbol="OCEAN"
        tokenAddress="0x967da4048cd07ab37855c090aaf366e4ce1b9f48"
        amount={debouncedAmount}
        amountAsi={debouncedAmount * ratioOceanToAsi}
        amountFiat={debouncedAmount * ratioOceanToAsi * prices.asi}
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
