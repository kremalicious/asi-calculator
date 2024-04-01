import { Result } from '@/components/ResultRow'
import { ratioOceanToAsi, ratioAgixToAsi, ratioFetToAsi } from '@/constants'
import { usePrices } from '@/hooks'
import { getTokenBySymbol } from '@/utils'
import { TokenSymbol } from '@/types'
import { useQuote } from '@/hooks'

export function SwapResults({
  tokenSymbol,
  amount
}: {
  tokenSymbol: TokenSymbol
  amount: number
}) {
  const {
    prices,
    isValidating: isValidatingPrices,
    isLoading: isLoadingPrices
  } = usePrices()

  const {
    amountToOcean,
    amountToAgix,
    amountToFet,
    isValidatingToAgix,
    isLoadingToAgix,
    isValidatingToFet,
    isLoadingToFet,
    isValidatingToOcean,
    isLoadingToOcean
  } = useQuote(tokenSymbol, amount)

  return (
    <>
      <Result
        token={getTokenBySymbol('OCEAN')}
        amount={amountToOcean}
        amountAsi={amountToOcean * ratioOceanToAsi}
        amountFiat={amountToOcean * ratioOceanToAsi * prices.asi}
        amountOriginalFiat={amountToOcean * prices.ocean}
        isValidating={isValidatingToOcean || isValidatingPrices}
        isLoading={isLoadingToOcean || isLoadingPrices}
      />

      <Result
        token={getTokenBySymbol('AGIX')}
        amount={amountToAgix}
        amountAsi={amountToAgix * ratioAgixToAsi}
        amountFiat={amountToAgix * ratioAgixToAsi * prices.asi}
        amountOriginalFiat={amountToAgix * prices.agix}
        isValidating={isValidatingToAgix || isValidatingPrices}
        isLoading={isLoadingToAgix || isLoadingPrices}
      />

      <Result
        token={getTokenBySymbol('FET')}
        amount={amountToFet}
        amountAsi={amountToFet * ratioFetToAsi}
        amountFiat={amountToFet * prices.asi}
        amountOriginalFiat={amountToFet * prices.asi}
        isValidating={isValidatingToFet || isValidatingPrices}
        isLoading={isLoadingToFet || isLoadingPrices}
      />
    </>
  )
}
