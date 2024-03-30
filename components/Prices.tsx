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
          <h3>Buying with ${exampleBuyInUsd} right now gets you:</h3>
          <Result
            symbol="OCEAN"
            amount={exampleBuyInUsd / priceOcean}
            amountAsi={(exampleBuyInUsd / priceOcean) * ratioOceanToAsi}
            amountFiat={
              (exampleBuyInUsd / priceOcean) * ratioOceanToAsi * priceAsi
            }
          />
          <Result
            symbol="AGIX"
            amount={exampleBuyInUsd / priceAgix}
            amountAsi={(exampleBuyInUsd / priceAgix) * ratioAgixToAsi}
            amountFiat={
              (exampleBuyInUsd / priceAgix) * ratioAgixToAsi * priceAsi
            }
          />
          <Result
            symbol="FET"
            amount={exampleBuyInUsd / priceFet}
            amountAsi={(exampleBuyInUsd / priceFet) * ratioFetToAsi}
            amountFiat={(exampleBuyInUsd / priceFet) * ratioFetToAsi * priceAsi}
          />
        </div>

        <div className={styles.results}>
          <h3>
            Swapping{' '}
            <FormAmount amount={amountSwap} setAmount={setAmountSwap} /> OCEAN (
            {formatNumber(debouncedAmountSwap * priceOcean, 'USD')}) gets you:
          </h3>

          <Result
            symbol="OCEAN"
            amount={debouncedAmountSwap}
            amountAsi={debouncedAmountSwap * ratioOceanToAsi}
            amountFiat={debouncedAmountSwap * ratioOceanToAsi * priceAsi}
          />

          <Result
            symbol="AGIX"
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
            symbol="FET"
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
      </div>
      <Content prices={{ ocean: priceOcean, agix: priceAgix, asi: priceAsi }} />
    </>
  )
}
