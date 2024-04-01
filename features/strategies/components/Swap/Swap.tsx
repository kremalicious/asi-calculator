'use client'

import { useState } from 'react'
import { useDebounce } from 'use-debounce'
import { SwapResults } from './Results'
import { TokenSymbol } from '@/types'
import { FormAmount, FormMarket } from '@/features/strategies/components'
import stylesShared from '@/features/strategies/styles/shared.module.css'
import { type Market } from '@/features/strategies'

export function Swap() {
  const [amount, setAmount] = useState(100)
  const [debouncedAmount] = useDebounce(amount, 500)
  const [tokenSymbol, setTokenSymbol] = useState<TokenSymbol>('OCEAN')
  const [market, setMarket] = useState<Market>('all')

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
        on <FormMarket market={market} setMarket={setMarket} /> right now gets
        you:
      </h3>

      <SwapResults
        tokenSymbol={tokenSymbol}
        amount={debouncedAmount}
        market={market}
      />
    </div>
  )
}
