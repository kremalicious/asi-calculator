import styles from './Content.module.css'

export function Content() {
  return (
    <div className={styles.content}>
      <p>
        All displayed values should be seen as estimates. Except for the{' '}
        <a href="https://blog.oceanprotocol.com/ocean-protocol-is-joining-the-superintelligence-alliance-767c82693f24#3c8e">
          fixed ASI exchange rate
        </a>
        , the fiat values fetched from{' '}
        <a href="https://coingecko.com">Coingecko</a> and the quotes from{' '}
        <a href="https://uniswap.org">Uniswap</a> v3 swap routes are constantly
        changing.
      </p>
      <p>
        There is no guarantee displayed values reflect the value of your
        investment once the actual ASI swap mechanism is released. Use at your
        own risk.
      </p>
    </div>
  )
}
