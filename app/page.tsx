import styles from './page.module.css'
import { Swap, Buy } from '@/features/strategies'
import { MarketData } from '@/features/prices'
import { Content, Footer, Header } from '@/components'

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
