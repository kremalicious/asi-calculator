import { Dispatch, SetStateAction } from 'react'
import { TokenSymbol } from '@/types'
import { Select, Input, FormInline } from '@/components'

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
  function handleAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target

    if (value === '') {
      setAmount(0)
    } else {
      setAmount(Number(value))
    }
  }

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
    <FormInline>
      <Input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        value={amount}
        onChange={handleAmountChange}
        style={{
          width: Math.min(Math.max(amount.toString().length, 2), 50) + 'ch'
        }}
      />

      <Select
        options={options}
        value={token}
        onChange={handleTokenChange}
        disabled={!setToken}
        style={setToken ? { paddingRight: '1.25rem' } : {}}
      />
    </FormInline>
  )
}
