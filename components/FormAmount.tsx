import styles from './FormAmount.module.css'

export function FormAmount({
  amount,
  setAmount
}: {
  amount: number
  setAmount: (amount: number) => void
}) {
  return (
    <form className={styles.form}>
      <input
        className={styles.input}
        type="text"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />
    </form>
  )
}
