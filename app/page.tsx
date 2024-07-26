import { Content, Footer, Header } from '@/components'
import { MarketData } from '@/features/prices'
import { Buy, Swap } from '@/features/strategies'
import styles from './page.module.css'

export default function Home() {
  return (
    <>
      <Header />

      <main className={styles.main}>
        <section className={styles.breakout}>
          <div className={styles.grid}>
            <Swap />
            <Buy />
          </div>
          <MarketData />
        </section>

        <Content />
      </main>

      <Footer />
    </>
  )
}
