import { title, description } from '@/constants'
import styles from './Header.module.css'
import { Logo } from '@/components/Logo'

export function Header() {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>
        <Logo className={styles.logo} /> {`${title}`}
      </h1>
      <p className={styles.description}>{`${description}`}</p>
    </header>
  )
}
