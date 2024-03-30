import styles from './Content.module.css'

export function Content() {
  return (
    <div className={styles.content}>
      <p>
        The fiat values are fetched from{' '}
        <a href="https://coingecko.com">Coingecko</a>, and the token swap
        estimations directly from <a href="https://uniswap.org">Uniswap</a> v3
        swap routes.
      </p>
      <p>
        All displayed values should be seen as estimates. Except for the{' '}
        <a href="https://blog.oceanprotocol.com/ocean-protocol-is-joining-the-superintelligence-alliance-767c82693f24#3c8e">
          fixed ASI exchange rate
        </a>
        , all other values are constantly changing based on market conditions.
      </p>

      <p>
        There is no guarantee the displayed values reflect the value of your
        investment once the actual ASI swap mechanism is released. Use at your
        own risk.
      </p>
    </div>
  )
}
