import { Prices } from '@/components/Prices'
import styles from './page.module.css'
import { metadata } from './layout'

export default function Home() {
  return (
    <>
      <header>
        <h1 className={styles.title}>{`${metadata.title}`}</h1>
        <p className={styles.description}>{`${metadata.description}`}</p>
      </header>
      <main className={styles.main}>
        <Prices />
      </main>
      <footer className={styles.footer}>
        Send ❤️ & meme coins to krema.eth
      </footer>
    </>
  )
}
