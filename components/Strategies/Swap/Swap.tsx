'use client'

import stylesShared from '../styles.module.css'
import { useState } from 'react'
import { useDebounce } from 'use-debounce'
import { FormAmount } from '@/components/FormAmount'
import { SwapResults } from './Results'
import { TokenSymbol } from '@/types'

export function Swap() {
  const [amount, setAmount] = useState(100)
  const [debouncedAmount] = useDebounce(amount, 500)
  const [tokenSymbol, setTokenSymbol] = useState<TokenSymbol>('OCEAN')

  return (
    <div className={stylesShared.results}>
      <h3 className={stylesShared.title}>
        Holding or swapping{' '}
        <FormAmount
          amount={amount}
          token={tokenSymbol}
          setAmount={setAmount}
          setToken={setTokenSymbol}
        />{' '}
        right now gets you:
      </h3>

      <SwapResults tokenSymbol={tokenSymbol} amount={debouncedAmount} />
    </div>
  )
}
