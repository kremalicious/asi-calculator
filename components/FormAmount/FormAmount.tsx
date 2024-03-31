import { InputAmount } from '@/components/FormAmount/Inputs/InputAmount'
import { InputToken } from './Inputs/InputToken'
import styles from './FormAmount.module.css'
import { Dispatch, SetStateAction } from 'react'
import { TokenSymbol } from '@/types'

export function FormAmount({
  amount,
  setAmount,
  token,
  setToken,
  isFiat
}: {
  amount: number
  setAmount: Dispatch<SetStateAction<number>>
  token: TokenSymbol | string
  setToken?: Dispatch<SetStateAction<TokenSymbol>>
  isFiat?: boolean
}) {
  return (
    <form className={styles.form}>
      <InputAmount amount={amount} setAmount={setAmount} />
      <InputToken token={token} setToken={setToken} isFiat={isFiat} />
    </form>
  )
}
