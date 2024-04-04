'use client'

import { useState } from 'react'
import { useDebounce } from 'use-debounce'
import { ratioOceanToAsi, ratioAgixToAsi, ratioFetToAsi } from '@/constants'
import { usePrices } from '@/features/prices'
import { getTokenBySymbol } from '@/lib/utils'
import { FormAmount, Result } from '@/features/strategies/components'
import stylesShared from '@/features/strategies/styles/shared.module.css'

export function Buy() {
  const { prices, isValidating, isLoading } = usePrices()
  const [amount, setAmount] = useState(100)
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
        amount={debouncedAmount / prices.ocean}
        amountAsi={(debouncedAmount / prices.ocean) * ratioOceanToAsi}
        amountFiat={
          (debouncedAmount / prices.ocean) * ratioOceanToAsi * prices.asi
        }
        isValidating={isValidating}
        isLoading={isLoading}
      />
      <Result
        token={getTokenBySymbol('AGIX')}
        amount={debouncedAmount / prices.agix}
        amountAsi={(debouncedAmount / prices.agix) * ratioAgixToAsi}
        amountFiat={
          (debouncedAmount / prices.agix) * ratioAgixToAsi * prices.asi
        }
        isValidating={isValidating}
        isLoading={isLoading}
      />
      <Result
        token={getTokenBySymbol('FET')}
        amount={debouncedAmount / prices.fet}
        amountAsi={(debouncedAmount / prices.fet) * ratioFetToAsi}
        amountFiat={(debouncedAmount / prices.fet) * ratioFetToAsi * prices.asi}
        isValidating={isValidating}
        isLoading={isLoading}
      />
    </div>
  )
}
