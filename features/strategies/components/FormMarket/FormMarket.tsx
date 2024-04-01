import styles from './FormMarket.module.css'
import { Dispatch, SetStateAction } from 'react'
import { Select } from '@/components'
import { type Market } from '@/features/strategies'

export function FormMarket({
  market,
  setMarket
}: {
  market: Market
  setMarket: Dispatch<SetStateAction<Market>>
}) {
  const options = [
    { value: 'market', label: 'All Markets' },
    { value: 'uniswap-v3', label: 'Uniswap v3' }
  ]
  return (
    <form className={styles.form}>
      <Select
        options={options}
        value={market}
        onChange={(e) => setMarket(e.target.value as Market)}
        style={{ paddingRight: '1.25rem' }}
      />
    </form>
  )
}
