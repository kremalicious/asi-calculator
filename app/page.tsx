import styles from './page.module.css'
import { Swap, Buy } from '@/features/strategies'
import { Content } from '@/components/Content'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { MarketData } from '@/features/prices'

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
