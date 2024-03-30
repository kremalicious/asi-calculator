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
      value={amount}
      onChange={(e) => setAmount(Number(e.target.value))}
    />
  )
}
