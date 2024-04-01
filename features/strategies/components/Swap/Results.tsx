import { ratioOceanToAsi, ratioAgixToAsi, ratioFetToAsi } from '@/constants'
import { getTokenBySymbol } from '@/lib/utils'
import { type TokenSymbol } from '@/types'
import { usePrices, type Prices } from '@/features/prices'
import { type Market, useQuote } from '@/features/strategies'
import { Result } from '../Result'

export function SwapResults({
  tokenSymbol,
  amount,
  market
}: {
  tokenSymbol: TokenSymbol
  amount: number
  market: Market
}) {
  const isUniswap = market === 'uniswap-v3'

  const {
    prices,
    isValidating: isValidatingPrices,
    isLoading: isLoadingPrices
  } = usePrices()

  const {
    amountToOcean: amountToOceanUniswap,
    amountToAgix: amountToAgixUniswap,
    amountToFet: amountToFetUniswap,
    isValidatingToAgix,
    isLoadingToAgix,
    isValidatingToFet,
    isLoadingToFet,
    isValidatingToOcean,
    isLoadingToOcean
  } = useQuote(tokenSymbol, amount, isUniswap)

  const amountInUsd = amount * prices[tokenSymbol.toLowerCase() as keyof Prices]
  const amountToOcean = amountInUsd / prices.ocean
  const amountToAgix = amountInUsd / prices.agix
  const amountToFet = amountInUsd / prices.fet

  return (
    <>
      <Result
        token={getTokenBySymbol('OCEAN')}
        amount={amountToOceanUniswap || amountToOcean}
        amountAsi={(amountToOceanUniswap || amountToOcean) * ratioOceanToAsi}
        amountFiat={
          (amountToOceanUniswap || amountToOcean) * ratioOceanToAsi * prices.asi
        }
        amountOriginalFiat={
          (amountToOceanUniswap || amountToOcean) * prices.ocean
        }
        isValidating={isValidatingToOcean || isValidatingPrices}
        isLoading={isLoadingToOcean || isLoadingPrices}
      />

      <Result
        token={getTokenBySymbol('AGIX')}
        amount={amountToAgixUniswap || amountToAgix}
        amountAsi={(amountToAgixUniswap || amountToAgix) * ratioAgixToAsi}
        amountFiat={
          (amountToAgixUniswap || amountToAgix) * ratioAgixToAsi * prices.asi
        }
        amountOriginalFiat={(amountToAgixUniswap || amountToAgix) * prices.agix}
        isValidating={isValidatingToAgix || isValidatingPrices}
        isLoading={isLoadingToAgix || isLoadingPrices}
      />

      <Result
        token={getTokenBySymbol('FET')}
        amount={amountToFetUniswap || amountToFet}
        amountAsi={(amountToFetUniswap || amountToFet) * ratioFetToAsi}
        amountFiat={(amountToFetUniswap || amountToFet) * prices.asi}
        amountOriginalFiat={(amountToFetUniswap || amountToFet) * prices.asi}
        isValidating={isValidatingToFet || isValidatingPrices}
        isLoading={isLoadingToFet || isLoadingPrices}
      />
    </>
  )
}
