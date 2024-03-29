'use client'

import useSWR from 'swr'
import styles from './Prices.module.css'
import { Result } from './Result'
import {
  tokens,
  ratioOceanToAsi,
  ratioAgixToAsi,
  exampleBuyInUsd,
  ratioFetToAsi
} from '@/constants'

const fetcher = async (url: string) => {
  const res = await fetch(url)
  if (!res.ok) throw new Error('Failed to fetch')
  return await res.json()
}

export function Prices() {
  const { data: dataPrices } = useSWR(
    `https://web3.kremalicious.com/api/prices/?tokens=${tokens.toString()}`,
    fetcher
  )
  const { data: dataSwapOceanToAgix } = useSWR(
    `/api/quote/?src=${tokens[0]}&dst=${tokens[2]}&amount=${
      exampleBuyInUsd * 1e18
    }`,
    fetcher
  )

  const { data: dataSwapOceanToFet } = useSWR(
    `/api/quote/?src=${tokens[0]}&dst=${tokens[1]}&amount=${
      exampleBuyInUsd * 1e18
    }`,
    fetcher
  )

  const priceOcean = dataPrices?.[tokens[0]]?.usd || 0
  const priceFet = dataPrices?.[tokens[1]]?.usd || 0
  const priceAgix = dataPrices?.[tokens[2]]?.usd || 0
  const priceAsi = priceFet

  return (
    <>
      <p>
        1 OCEAN = {ratioOceanToAsi} ASI (fixed) = ${priceOcean}
      </p>
      <p>
        1 AGIX = {ratioAgixToAsi} ASI (fixed) = ${priceAgix}
      </p>
      <p>1 Fet = 1 ASI (fixed) = ${priceAsi}</p>

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
          amountFiat={(exampleBuyInUsd / priceAgix) * ratioAgixToAsi * priceAsi}
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
          Swapping 100 OCEAN (${(100 * priceOcean).toFixed(2)}) right now gets
          you:
        </h3>

        <Result
          symbol="OCEAN"
          amount={100}
          amountAsi={100 * ratioOceanToAsi}
          amountFiat={100 * ratioOceanToAsi * priceAsi}
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
    </>
  )
}
