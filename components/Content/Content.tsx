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
        The displayed values should be seen as estimates. Except for the{' '}
        <a href="https://blog.oceanprotocol.com/ocean-protocol-is-joining-the-superintelligence-alliance-767c82693f24#3c8e">
          fixed ASI exchange rate
        </a>
        , the fiat values fetched from <a href="">Coingecko</a> and the token
        swap quotes from <a href="https://uniswap.org">Uniswap</a> v3 routes are
        constantly changing.
      </p>
      <p>
        There is no guarantee they reflect the value of your investment once the
        actual ASI swap mechanism is released. Use at your own risk.
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
          <br />= ${prices.fet}
        </li>
        <li>
          1 ASI
          <br />= ${prices.asi}
        </li>
      </ul>
    </div>
  )
}
