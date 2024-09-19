import { FormInline, Select } from '@/components'
import type { Market } from '@/features/strategies'
import type { Dispatch, SetStateAction } from 'react'

const options = [
  { value: 'market', label: 'All Markets' },
  { value: 'migration', label: 'Migration Tool' },
  { value: 'uniswap', label: 'Uniswap' }
]

export function FormMarket({
  market,
  setMarket
}: {
  market: Market
  setMarket: Dispatch<SetStateAction<Market>>
}) {
  return (
    <FormInline>
      <Select
        options={options}
        value={market}
        onChange={(e) => setMarket(e.target.value as Market)}
        style={{ paddingRight: '1.2rem' }}
      />
    </FormInline>
  )
}
