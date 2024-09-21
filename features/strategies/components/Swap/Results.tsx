import {
  ratioAgixToAsi,
  ratioCudosToAsi,
  ratioFetToAsi,
  ratioOceanToAsi
} from '@/constants'
import { type Prices, usePrices } from '@/features/prices'
import { type Market, useQuote } from '@/features/strategies'
import { getTokenBySymbol } from '@/lib'
import type { TokenSymbol } from '@/types'
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
  const isUniswap = market === 'uniswap'
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
    amountToCudos: amountToCudosUniswap,
    isValidatingToAgix,
    isLoadingToAgix,
    isValidatingToFet,
    isLoadingToFet,
    isValidatingToOcean,
    isLoadingToOcean,
    isValidatingToCudos,
    isLoadingToCudos
  } = useQuote(tokenSymbol, amount, isUniswap)

  const tokenSelected = tokenSymbol.toLowerCase() as keyof Prices

  const amountInUsd = amount * prices[tokenSelected]?.usd
  const amountToOcean = amountInUsd / prices.ocean?.usd
  const amountToAgix = amountInUsd / prices.agix?.usd
  const amountToCudos = amountInUsd / prices.cudos?.usd

  // As of July 1st, use fixed ratios instead of FET market price
  // for Migration Tool scenario
  const amountToFet = isMigration
    ? tokenSelected === 'ocean'
      ? amount * ratioOceanToAsi
      : tokenSelected === 'agix'
        ? amount * ratioAgixToAsi
        : tokenSelected === 'cudos'
          ? amount * ratioCudosToAsi
          : amount
    : amountInUsd / prices.fet?.usd

  const showOcean = !isMigration || (isMigration && tokenSelected === 'ocean')
  const showAgix = !isMigration || (isMigration && tokenSelected === 'agix')
  const showFet = !isMigration || (isMigration && tokenSelected === 'fet')
  const showCudos = !isMigration || (isMigration && tokenSelected === 'cudos')

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
            prices.asi?.usd
          }
          amountOriginalFiat={
            (amountToOceanUniswap || amountToOcean) * prices.ocean?.usd
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
            prices.asi?.usd
          }
          amountOriginalFiat={
            (amountToAgixUniswap || amountToAgix) * prices.agix?.usd
          }
          isValidating={isValidatingToAgix || isValidatingPrices}
          isLoading={isLoadingToAgix || isLoadingPrices}
        />
      ) : null}

      {showCudos ? (
        <Result
          token={getTokenBySymbol('CUDOS')}
          amount={amountToCudosUniswap || amountToCudos}
          amountAsi={(amountToCudosUniswap || amountToCudos) * ratioCudosToAsi}
          amountFiat={
            (amountToCudosUniswap || amountToCudos) *
            ratioCudosToAsi *
            prices.asi?.usd
          }
          amountOriginalFiat={
            (amountToCudosUniswap || amountToCudos) * prices.cudos?.usd
          }
          isValidating={isValidatingToCudos || isValidatingPrices}
          isLoading={isLoadingToCudos || isLoadingPrices}
        />
      ) : null}

      {showFet ? (
        <Result
          token={getTokenBySymbol('FET')}
          amount={amountToFetUniswap || amountToFet}
          amountAsi={(amountToFetUniswap || amountToFet) * ratioFetToAsi}
          amountFiat={(amountToFetUniswap || amountToFet) * prices.asi?.usd}
          amountOriginalFiat={
            (amountToFetUniswap || amountToFet) * prices.asi?.usd
          }
          isValidating={isValidatingToFet || isValidatingPrices}
          isLoading={isLoadingToFet || isLoadingPrices}
        />
      ) : null}
    </>
  )
}
