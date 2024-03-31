import { metadata } from '@/app/layout'
import styles from './Header.module.css'

export function Header() {
  return (
    <header>
      <h1 className={styles.title}>{`${metadata.title}`}</h1>
      <p className={styles.description}>{`${metadata.description}`}</p>
    </header>
  )
}
