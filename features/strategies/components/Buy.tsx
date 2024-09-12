'use client'

import {
  ratioAgixToAsi,
  ratioCudosToAsi,
  ratioFetToAsi,
  ratioOceanToAsi
} from '@/constants'
import { usePrices } from '@/features/prices'
import { FormAmount, Result, usePersistentState } from '@/features/strategies'
import stylesShared from '@/features/strategies/styles/shared.module.css'
import { getTokenBySymbol } from '@/lib'
import { useDebounce } from 'use-debounce'

export function Buy() {
  const { prices, isValidating, isLoading } = usePrices()
  const [amount, setAmount] = usePersistentState('buyAmount', 100)
  const [debouncedAmount] = useDebounce(amount, 500)

  return (
    <div className={stylesShared.results}>
      <h3 className={stylesShared.title}>
        Buying with{' '}
        <FormAmount amount={amount} setAmount={setAmount} token="usd" isFiat />{' '}
        right now gets you:
      </h3>
      <Result
        token={getTokenBySymbol('OCEAN')}
        amount={debouncedAmount / prices.ocean.usd}
        amountAsi={(debouncedAmount / prices.ocean.usd) * ratioOceanToAsi}
        amountFiat={
          (debouncedAmount / prices.ocean.usd) *
          ratioOceanToAsi *
          prices.asi.usd
        }
        isValidating={isValidating}
        isLoading={isLoading}
      />
      <Result
        token={getTokenBySymbol('AGIX')}
        amount={debouncedAmount / prices.agix.usd}
        amountAsi={(debouncedAmount / prices.agix.usd) * ratioAgixToAsi}
        amountFiat={
          (debouncedAmount / prices.agix.usd) * ratioAgixToAsi * prices.asi.usd
        }
        isValidating={isValidating}
        isLoading={isLoading}
      />
      <Result
        token={getTokenBySymbol('CUDOS')}
        amount={debouncedAmount / prices.cudos.usd}
        amountAsi={debouncedAmount / prices.cudos.usd / ratioCudosToAsi}
        amountFiat={
          (debouncedAmount / prices.cudos.usd / ratioCudosToAsi) *
          prices.asi.usd
        }
        isValidating={isValidating}
        isLoading={isLoading}
      />
      <Result
        token={getTokenBySymbol('FET')}
        amount={debouncedAmount / prices.fet.usd}
        amountAsi={(debouncedAmount / prices.fet.usd) * ratioFetToAsi}
        amountFiat={
          (debouncedAmount / prices.fet.usd) * ratioFetToAsi * prices.asi.usd
        }
        isValidating={isValidating}
        isLoading={isLoading}
      />
    </div>
  )
}
