'use client'

import useSWR from 'swr'
import { useDebounce } from 'use-debounce'
import styles from './Prices.module.css'
import { Result } from './Result'
import {
  tokens,
  ratioOceanToAsi,
  ratioAgixToAsi,
  exampleBuyInUsd,
  ratioFetToAsi
} from '@/constants'
import { useState } from 'react'
import { FormAmount } from './FormAmount'
import { fetcher, formatNumber } from '@/utils'
import { Content } from '@/components/Content'

export function Prices() {
  const [amountSwap, setAmountSwap] = useState(100)
  const [debouncedAmountSwap] = useDebounce(amountSwap, 500)

  const { data: dataPrices } = useSWR(
    `/api/prices/?tokens=${tokens.toString()}`,
    fetcher
  )

  const { data: dataSwapOceanToAgix } = useSWR(
    `/api/quote/?src=${tokens[0]}&dst=${tokens[2]}&amount=${
      debouncedAmountSwap * 1e18
    }`,
    fetcher
  )
  console.log(dataSwapOceanToAgix)

  const { data: dataSwapOceanToFet } = useSWR(
    `/api/quote/?src=${tokens[0]}&dst=${tokens[1]}&amount=${
      debouncedAmountSwap * 1e18
    }`,
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
            {formatNumber(debouncedAmountSwap * priceOcean, 'USD')}) gets you:
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
              dataSwapOceanToAgix?.dstAmount /
                Number(`1e${dataSwapOceanToAgix?.dstToken?.decimals}`) || 0
            }
            amountAsi={
              (dataSwapOceanToAgix?.dstAmount /
                Number(`1e${dataSwapOceanToAgix?.dstToken?.decimals}`) || 0) *
              ratioAgixToAsi
            }
            amountFiat={
              (dataSwapOceanToAgix?.dstAmount /
                Number(`1e${dataSwapOceanToAgix?.dstToken?.decimals}`) || 0) *
              ratioAgixToAsi *
              priceAsi
            }
          />

          <Result
            tokenSymbol="FET"
            tokenAddress="0xaea46a60368a7bd060eec7df8cba43b7ef41ad85"
            amount={
              dataSwapOceanToFet?.dstAmount /
                Number(`1e${dataSwapOceanToFet?.dstToken?.decimals}`) || 0
            }
            amountAsi={
              (dataSwapOceanToFet?.dstAmount /
                Number(`1e${dataSwapOceanToFet?.dstToken?.decimals}`) || 0) *
              ratioFetToAsi
            }
            amountFiat={
              (dataSwapOceanToFet?.dstAmount /
                Number(`1e${dataSwapOceanToFet?.dstToken?.decimals}`) || 0) *
              priceAsi
            }
          />
        </div>

        <div className={styles.results}>
          <h3>Buying with ${exampleBuyInUsd} right now gets you:</h3>
          <Result
            tokenSymbol="OCEAN"
            tokenAddress="0x967da4048cd07ab37855c090aaf366e4ce1b9f48"
            amount={priceOcean ? exampleBuyInUsd / priceOcean : 0}
            amountAsi={
              priceOcean ? (exampleBuyInUsd / priceOcean) * ratioOceanToAsi : 0
            }
            amountFiat={
              priceOcean
                ? (exampleBuyInUsd / priceOcean) * ratioOceanToAsi * priceAsi
                : 0
            }
          />
          <Result
            tokenSymbol="AGIX"
            tokenAddress="0x5b7533812759b45c2b44c19e320ba2cd2681b542"
            amount={priceAgix ? exampleBuyInUsd / priceAgix : 0}
            amountAsi={
              priceAgix ? (exampleBuyInUsd / priceAgix) * ratioAgixToAsi : 0
            }
            amountFiat={
              priceAgix
                ? (exampleBuyInUsd / priceAgix) * ratioAgixToAsi * priceAsi
                : 0
            }
          />
          <Result
            tokenSymbol="FET"
            tokenAddress="0xaea46a60368a7bd060eec7df8cba43b7ef41ad85"
            amount={priceFet ? exampleBuyInUsd / priceFet : 0}
            amountAsi={
              priceFet ? (exampleBuyInUsd / priceFet) * ratioFetToAsi : 0
            }
            amountFiat={
              priceFet
                ? (exampleBuyInUsd / priceFet) * ratioFetToAsi * priceAsi
                : 0
            }
          />
        </div>
      </div>
      <Content prices={{ ocean: priceOcean, agix: priceAgix, asi: priceAsi }} />
    </>
  )
}
