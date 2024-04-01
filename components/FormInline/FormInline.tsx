import styles from './FormInline.module.css'

export function FormInline({ children }: { children: React.ReactNode }) {
  return <form className={styles.form}>{children}</form>
}
