'use client'

import { ratioOceanToAsi, ratioAgixToAsi, ratioFetToAsi } from '@/constants'
import { Result } from '@/components/ResultRow'
import { useState } from 'react'
import { useDebounce } from 'use-debounce'
import stylesShared from './styles.module.css'
import { usePrices } from '@/hooks'
import { FormAmount } from '@/components/FormAmount'
import { getTokenBySymbol } from '@/lib/utils'

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
        amount={prices.ocean ? debouncedAmount / prices.ocean : 0}
        amountAsi={
          prices.ocean ? (debouncedAmount / prices.ocean) * ratioOceanToAsi : 0
        }
        amountFiat={
          prices.ocean
            ? (debouncedAmount / prices.ocean) * ratioOceanToAsi * prices.asi
            : 0
        }
        isValidating={isValidating}
        isLoading={isLoading}
      />
      <Result
        token={getTokenBySymbol('AGIX')}
        amount={prices.agix ? debouncedAmount / prices.agix : 0}
        amountAsi={
          prices.agix ? (debouncedAmount / prices.agix) * ratioAgixToAsi : 0
        }
        amountFiat={
          prices.agix
            ? (debouncedAmount / prices.agix) * ratioAgixToAsi * prices.asi
            : 0
        }
        isValidating={isValidating}
        isLoading={isLoading}
      />
      <Result
        token={getTokenBySymbol('FET')}
        amount={prices.fet ? debouncedAmount / prices.fet : 0}
        amountAsi={
          prices.fet ? (debouncedAmount / prices.fet) * ratioFetToAsi : 0
        }
        amountFiat={
          prices.fet
            ? (debouncedAmount / prices.fet) * ratioFetToAsi * prices.asi
            : 0
        }
        isValidating={isValidating}
        isLoading={isLoading}
      />
    </div>
  )
}
