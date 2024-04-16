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
    } else if (isNaN(Number(value))) {
      return
    } else {
      setAmount(Number(value))
    }
  }

  function handleTokenChange(e: React.ChangeEvent<HTMLSelectElement>) {
    if (!setToken) return
    setToken(e.target.value as TokenSymbol)
  }

  function handleFocus(e: React.FocusEvent<HTMLInputElement>) {
    e.target.select()
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
        onFocus={handleFocus}
        style={{ width: amount.toString().length + 'ch' }}
      />

      <Select
        options={options}
        value={token}
        onChange={handleTokenChange}
        disabled={!setToken}
        style={
          setToken
            ? {
                paddingRight: '1.2rem',
                width: `calc(${token.length + 'em'} - 1.75rem)`,
                minWidth: '1.85rem'
              }
            : undefined
        }
      />
    </FormInline>
  )
}
