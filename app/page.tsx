import { Prices } from '@/features/Prices'
import styles from './page.module.css'

export default function Home() {
  return (
    <>
      <main className={styles.main}>
        <h1 className={styles.title}>Should I Buy OCEAN or AGIX or FET?</h1>
        <Prices />
      </main>
      <footer className={styles.footer}>Send ❤️ to krema.eth</footer>
    </>
  )
}
