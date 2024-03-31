import styles from './page.module.css'
import { Swap, Buy } from '@/components/Strategies'
import { Content } from '@/components/Content'
import { CalculationBase } from '@/components/CalculationBaseOutput'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

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
          <CalculationBase />
        </section>

        <Content />
      </main>

      <Footer />
    </>
  )
}
