import { Prices } from '@/components/Prices'
import styles from './page.module.css'
import { metadata } from './layout'

export default function Home() {
  return (
    <>
      <main className={styles.main}>
        <h1 className={styles.title}>{`${metadata.title}`}</h1>
        <p className={styles.description}>{`${metadata.description}`}</p>
        <Prices />
      </main>
      <footer className={styles.footer}>Send ❤️ to krema.eth</footer>
    </>
  )
}
