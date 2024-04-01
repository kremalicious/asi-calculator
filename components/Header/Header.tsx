import { title, description } from '@/constants'
import styles from './Header.module.css'

export function Header() {
  return (
    <header>
      <h1 className={styles.title}>{`${title}`}</h1>
      <p className={styles.description}>{`${description}`}</p>
    </header>
  )
}
