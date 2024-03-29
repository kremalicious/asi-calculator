'use client'

import useSWR from 'swr'
import styles from './Prices.module.css'
import { Result } from './Result'

const fetcher = (url: string) => fetch(url).then((res) => res.json())
const ratioOceanToAsi = 0.433226
const ratioAgixToAsi = 0.43335
const tokens: `0x${string}`[] = [
  '0x967da4048cd07ab37855c090aaf366e4ce1b9f48', // OCEAN
  '0xaea46a60368a7bd060eec7df8cba43b7ef41ad85', // FET
  '0x5b7533812759b45c2b44c19e320ba2cd2681b542' // AGIX
]
const exampleBuyInUsd = 100

export function Prices() {
  const { data, error, isLoading } = useSWR(
    `https://web3.kremalicious.com/api/prices/?tokens=${tokens.toString()}`,
    fetcher
  )

  const priceOcean = data?.[tokens[0]]?.usd.toFixed(2) || 0
  const priceFet = data?.[tokens[1]]?.usd.toFixed(2) || 0
  const priceAgix = data?.[tokens[2]]?.usd.toFixed(2) || 0

  return (
    <>
      <p>
        1 OCEAN = ${priceOcean} = {ratioOceanToAsi} ASI
      </p>
      <p>
        1 AGIX = ${priceAgix} = {ratioAgixToAsi} ASI
      </p>
      <p>1 Fet = ${priceFet} = 1 ASI</p>

      <div className={styles.results}>
        <h3>If you buy with ${exampleBuyInUsd} right now:</h3>
        <Result
          symbol="OCEAN"
          price={priceOcean}
          priceAsi={priceFet}
          ratio={ratioOceanToAsi}
          exampleBuyInUsd={exampleBuyInUsd}
        />
        <Result
          symbol="AGIX"
          price={priceAgix}
          priceAsi={priceFet}
          ratio={ratioAgixToAsi}
          exampleBuyInUsd={exampleBuyInUsd}
        />
        <Result
          symbol="FET"
          price={priceFet}
          priceAsi={priceFet}
          ratio={1}
          exampleBuyInUsd={exampleBuyInUsd}
        />
      </div>
    </>
  )
}
