import { Content, Footer, Header } from '@/components'
import { MarketData } from '@/features/prices'
import { Buy, Swap } from '@/features/strategies'
import styles from './page.module.css'

export default function Home() {
  return (
    <>
      <Header />

      <main className={styles.main}>
        <header className={styles.notice}>
          <p>
            The ASI token experiment never quite left the lab — no promised
            token ever launched, and only the Ocean Protocol team helped keep
            this site afloat (huge thanks 🐋).
          </p>

          <p>
            With Ocean Protocol now{' '}
            <a href="https://blog.oceanprotocol.com/ocean-protocol-foundation-withdraws-from-the-artificial-superintelligence-alliance-4619c4604ea3">
              no longer part of the ASI alliance
            </a>
            , this calculator has been shut down.
          </p>
        </header>
      </main>

      <Footer />
    </>
  )
}
