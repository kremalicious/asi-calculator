'use client'

import { SetStateAction, useState } from 'react'
import { useDebounce } from 'use-debounce'
import { SwapResults } from './Results'
import { TokenSymbol } from '@/types'
import { type Market, FormAmount, FormMarket } from '@/features/strategies'
import stylesShared from '@/features/strategies/styles/shared.module.css'

const isClient = typeof window !== 'undefined'

export function Swap() {
  const [amount, setAmountState] = useState(
    isClient ? Number(localStorage.getItem('swapAmount')) : 100 || 100
  )
  const [debouncedAmount] = useDebounce(amount, 500)
  const [tokenSymbol, setTokenSymbolState] = useState<TokenSymbol>(
    isClient
      ? (localStorage.getItem('swapTokenSymbol') as TokenSymbol)
      : 'OCEAN' || 'OCEAN'
  )
  const [market, setMarketState] = useState<Market>(
    isClient ? (localStorage.getItem('swapMarket') as Market) : 'all' || 'all'
  )

  function setAmount(amount: SetStateAction<number>) {
    setAmountState(amount)
    localStorage.setItem('swapAmount', amount.toString())
  }

  function setTokenSymbol(tokenSymbol: SetStateAction<TokenSymbol>) {
    setTokenSymbolState(tokenSymbol)
    localStorage.setItem('swapTokenSymbol', tokenSymbol as string)
  }

  function setMarket(market: SetStateAction<Market>) {
    setMarketState(market)
    localStorage.setItem('swapMarket', market as string)
  }

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
