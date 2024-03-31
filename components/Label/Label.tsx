import styles from './Label.module.css'

export function Label({ children }: { children: React.ReactNode }) {
  return <span className={styles.label}>{children}</span>
}
