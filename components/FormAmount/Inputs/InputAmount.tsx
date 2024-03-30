import { Dispatch, SetStateAction } from 'react'
import styles from './InputAmount.module.css'

export function InputAmount({
  amount,
  setAmount
}: {
  amount: number
  setAmount: Dispatch<SetStateAction<number>>
}) {
  return (
    <input
      className={styles.input}
      type="text"
      inputMode="numeric"
      pattern="[0-9]*"
      value={amount}
      onChange={(e) => setAmount(Number(e.target.value))}
    />
  )
}
