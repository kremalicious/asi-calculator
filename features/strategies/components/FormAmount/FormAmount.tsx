import { InputAmount } from './Inputs/InputAmount'
import styles from './FormAmount.module.css'
import { Dispatch, SetStateAction } from 'react'
import { TokenSymbol } from '@/types'
import { Select } from '@/components/Select'

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
  function handleTokenChange(e: React.ChangeEvent<HTMLSelectElement>) {
    if (!setToken) return
    setToken(e.target.value as TokenSymbol)
  }

  const options = isFiat
    ? [{ value: 'USD', label: 'USD' }]
    : [
        { value: 'OCEAN', label: 'OCEAN' },
        { value: 'FET', label: 'FET' },
        { value: 'AGIX', label: 'AGIX' }
      ]

  return (
    <form className={styles.form}>
      <InputAmount amount={amount} setAmount={setAmount} />

      <Select
        options={options}
        value={token}
        onChange={handleTokenChange}
        disabled={!setToken}
        style={setToken ? { paddingRight: '1.25rem' } : {}}
      />
    </form>
  )
}
