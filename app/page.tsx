import styles from './page.module.css'
import { metadata } from './layout'
import { Swap, Buy } from '@/components/Strategies'
import { Content } from '@/components/Content'
import { CalculationBase } from '@/components/CalculationBase'

export default function Home() {
  return (
    <>
      <header>
        <h1 className={styles.title}>{`${metadata.title}`}</h1>
        <p className={styles.description}>{`${metadata.description}`}</p>
      </header>
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
      <footer className={styles.footer}>
        Send ❤️ and memecoins to krema.eth
      </footer>
    </>
  )
}
