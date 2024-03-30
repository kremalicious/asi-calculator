import { ratioOceanToAsi, ratioAgixToAsi, ratioFetToAsi } from '@/constants'
import styles from './Content.module.css'

type Props = {
  prices: {
    [key: string]: number
  }
}

export function Content({ prices }: Props) {
  return (
    <div className={styles.content}>
      <p>
        Calculations are based on the{' '}
        <a href="https://blog.oceanprotocol.com/ocean-protocol-is-joining-the-superintelligence-alliance-767c82693f24#3c8e">
          fixed ASI exchange rate
        </a>
        , the fluctuating fiat values fetched from <a href="">Coingecko</a>, and
        token swap quotes from <a href="https://uniswap.org">Uniswap</a> v3
        routes.
      </p>

      <ul className={styles.calculationBase}>
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
        <li>
          1 Fet = {ratioFetToAsi} ASI
          <span className={styles.label}>fixed</span>
          <br />= ${prices.asi}
        </li>
      </ul>
    </div>
  )
}
