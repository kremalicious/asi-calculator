'use client'

import useSWR from 'swr'
import { useDebounce } from 'use-debounce'
import styles from './Prices.module.css'
import { Result } from './Result'
import {
  tokens,
  ratioOceanToAsi,
  ratioAgixToAsi,
  ratioFetToAsi
} from '@/constants'
import { useState } from 'react'
import { FormAmount } from './FormAmount'
import { fetcher, formatNumber } from '@/utils'
import { Content } from '@/components/Content'

export function Prices() {
  const [amountSwap, setAmountSwap] = useState(100)
  const [debouncedAmountSwap] = useDebounce(amountSwap, 500)
  const [amountBuy, setAmountBuy] = useState(100)
  const [debouncedAmountBuy] = useDebounce(amountBuy, 500)

  const { data: dataPrices } = useSWR(
    `/api/prices/?tokens=${tokens.toString()}`,
    fetcher
  )

  const { data: dataSwapOceanToAgix } = useSWR(
    `/api/quote/?tokenIn=${tokens[0]}&tokenOut=${tokens[2]}&amountIn=${debouncedAmountSwap}`,
    fetcher
  )

  const { data: dataSwapOceanToFet } = useSWR(
    `/api/quote/?tokenIn=${tokens[0]}&tokenOut=${tokens[1]}&amountIn=${debouncedAmountSwap}`,
    fetcher
  )

  const priceOcean = dataPrices?.[tokens[0]]?.usd || 0
  const priceFet = dataPrices?.[tokens[1]]?.usd || 0
  const priceAgix = dataPrices?.[tokens[2]]?.usd || 0
  const priceAsi = priceFet

  return (
    <>
      <div className={styles.grid}>
        <div className={styles.results}>
          <h3>
            Swapping{' '}
            <FormAmount amount={amountSwap} setAmount={setAmountSwap} /> OCEAN (
            {formatNumber(debouncedAmountSwap * priceOcean, 'USD')}) right now
            gets you:
          </h3>

          <Result
            tokenSymbol="OCEAN"
            tokenAddress="0x967da4048cd07ab37855c090aaf366e4ce1b9f48"
            amount={debouncedAmountSwap}
            amountAsi={debouncedAmountSwap * ratioOceanToAsi}
            amountFiat={debouncedAmountSwap * ratioOceanToAsi * priceAsi}
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
                Number(`1e${dataSwapOceanToAgix?.decimals}`) || 0) *
              ratioAgixToAsi
            }
            amountFiat={
              (dataSwapOceanToAgix?.amountOut /
                Number(`1e${dataSwapOceanToAgix?.decimals}`) || 0) *
              ratioAgixToAsi *
              priceAsi
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
                Number(`1e${dataSwapOceanToFet?.decimals}`) || 0) *
              ratioFetToAsi
            }
            amountFiat={
              (dataSwapOceanToFet?.amountOut /
                Number(`1e${dataSwapOceanToFet?.decimals}`) || 0) * priceAsi
            }
          />
        </div>

        <div className={styles.results}>
          <h3>
            Buying with $
            <FormAmount amount={amountBuy} setAmount={setAmountBuy} /> right now
            gets you:
          </h3>
          <Result
            tokenSymbol="OCEAN"
            tokenAddress="0x967da4048cd07ab37855c090aaf366e4ce1b9f48"
            amount={priceOcean ? debouncedAmountBuy / priceOcean : 0}
            amountAsi={
              priceOcean
                ? (debouncedAmountBuy / priceOcean) * ratioOceanToAsi
                : 0
            }
            amountFiat={
              priceOcean
                ? (debouncedAmountBuy / priceOcean) * ratioOceanToAsi * priceAsi
                : 0
            }
          />
          <Result
            tokenSymbol="AGIX"
            tokenAddress="0x5b7533812759b45c2b44c19e320ba2cd2681b542"
            amount={priceAgix ? debouncedAmountBuy / priceAgix : 0}
            amountAsi={
              priceAgix ? (debouncedAmountBuy / priceAgix) * ratioAgixToAsi : 0
            }
            amountFiat={
              priceAgix
                ? (debouncedAmountBuy / priceAgix) * ratioAgixToAsi * priceAsi
                : 0
            }
          />
          <Result
            tokenSymbol="FET"
            tokenAddress="0xaea46a60368a7bd060eec7df8cba43b7ef41ad85"
            amount={priceFet ? debouncedAmountBuy / priceFet : 0}
            amountAsi={
              priceFet ? (debouncedAmountBuy / priceFet) * ratioFetToAsi : 0
            }
            amountFiat={
              priceFet
                ? (debouncedAmountBuy / priceFet) * ratioFetToAsi * priceAsi
                : 0
            }
          />
        </div>
      </div>
      <Content prices={{ ocean: priceOcean, agix: priceAgix, asi: priceAsi }} />
    </>
  )
}
