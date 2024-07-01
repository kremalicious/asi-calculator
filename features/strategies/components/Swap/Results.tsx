import { ratioOceanToAsi, ratioAgixToAsi, ratioFetToAsi } from '@/constants'
import { getTokenBySymbol } from '@/lib'
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
  const isMigration = market === 'migration'

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

  const tokenSelected = tokenSymbol.toLowerCase() as keyof Prices

  const amountInUsd = amount * prices[tokenSelected].usd
  const amountToOcean = amountInUsd / prices.ocean.usd
  const amountToAgix = amountInUsd / prices.agix.usd

  // As of July 1st, use fixed ratios instead of FET market price
  // for Migration Tool scenario
  const amountToFet = isMigration
    ? tokenSelected === 'ocean'
      ? amount * ratioOceanToAsi
      : tokenSelected === 'agix'
        ? amount * ratioAgixToAsi
        : amount
    : amountInUsd / prices.fet.usd

  const showOcean = !isMigration || (isMigration && tokenSelected === 'ocean')
  const showAgix = !isMigration || (isMigration && tokenSelected === 'agix')

  return (
    <>
      {showOcean ? (
        <Result
          token={getTokenBySymbol('OCEAN')}
          amount={amountToOceanUniswap || amountToOcean}
          amountAsi={(amountToOceanUniswap || amountToOcean) * ratioOceanToAsi}
          amountFiat={
            (amountToOceanUniswap || amountToOcean) *
            ratioOceanToAsi *
            prices.asi.usd
          }
          amountOriginalFiat={
            (amountToOceanUniswap || amountToOcean) * prices.ocean.usd
          }
          isValidating={isValidatingToOcean || isValidatingPrices}
          isLoading={isLoadingToOcean || isLoadingPrices}
        />
      ) : null}

      {showAgix ? (
        <Result
          token={getTokenBySymbol('AGIX')}
          amount={amountToAgixUniswap || amountToAgix}
          amountAsi={(amountToAgixUniswap || amountToAgix) * ratioAgixToAsi}
          amountFiat={
            (amountToAgixUniswap || amountToAgix) *
            ratioAgixToAsi *
            prices.asi.usd
          }
          amountOriginalFiat={
            (amountToAgixUniswap || amountToAgix) * prices.agix.usd
          }
          isValidating={isValidatingToAgix || isValidatingPrices}
          isLoading={isLoadingToAgix || isLoadingPrices}
        />
      ) : null}

      <Result
        token={getTokenBySymbol('FET')}
        amount={amountToFetUniswap || amountToFet}
        amountAsi={(amountToFetUniswap || amountToFet) * ratioFetToAsi}
        amountFiat={(amountToFetUniswap || amountToFet) * prices.asi.usd}
        amountOriginalFiat={
          (amountToFetUniswap || amountToFet) * prices.asi.usd
        }
        isValidating={isValidatingToFet || isValidatingPrices}
        isLoading={isLoadingToFet || isLoadingPrices}
      />
    </>
  )
}
