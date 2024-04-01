'use client'

import { Dispatch, SetStateAction, useRef, useState } from 'react'
import styles from './InputAmount.module.css'

export function InputAmount({
  amount,
  setAmount
}: {
  amount: number
  setAmount: Dispatch<SetStateAction<number>>
}) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target

    if (value === '') {
      setAmount(0)
    } else {
      setAmount(Number(value))
    }
  }

  return (
    <input
      className={styles.input}
      type="text"
      inputMode="numeric"
      pattern="[0-9]*"
      value={amount}
      onChange={handleChange}
      style={{
        width: Math.min(Math.max(amount.toString().length, 2), 50) + 'ch'
      }}
    />
  )
}
