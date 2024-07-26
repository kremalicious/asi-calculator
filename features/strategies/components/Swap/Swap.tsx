'use client'

import {
  FormAmount,
  FormMarket,
  type Market,
  usePersistentState
} from '@/features/strategies'
import stylesShared from '@/features/strategies/styles/shared.module.css'
import type { TokenSymbol } from '@/types'
import { useDebounce } from 'use-debounce'
import { SwapResults } from './Results'

export function Swap() {
  const [amount, setAmount] = usePersistentState('swapAmount', 100)
  const [debouncedAmount] = useDebounce(amount, 500)
  const [tokenSymbol, setTokenSymbol] = usePersistentState<TokenSymbol>(
    'swapTokenSymbol',
    'OCEAN'
  )
  const [market, setMarket] = usePersistentState<Market>('swapMarket', 'all')

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
