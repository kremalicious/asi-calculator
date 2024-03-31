import { Result } from '@/components/ResultRow'
import { ratioOceanToAsi, ratioAgixToAsi, ratioFetToAsi } from '@/constants'
import { usePrices } from '@/hooks'
import { fetcher, getTokenAddressBySymbol, getTokenBySymbol } from '@/utils'
import useSWR from 'swr'
import { TokenSymbol } from '@/types'

export function SwapResults({
  tokenSymbol,
  amount
}: {
  tokenSymbol: TokenSymbol
  amount: number
}) {
  const { prices, isValidating: isValidatingPrices } = usePrices()

  // -> AGIX
  const { data: dataSwapToAgix, isValidating: isValidatingToAgix } = useSWR(
    `/api/quote/?tokenIn=${getTokenAddressBySymbol(
      tokenSymbol
    )}&tokenOut=${getTokenAddressBySymbol('AGIX')}&amountIn=${amount}`,
    fetcher
  )

  // -> FET
  const { data: dataSwapToFet, isValidating: isValidatingToFet } = useSWR(
    `/api/quote/?tokenIn=${getTokenAddressBySymbol(
      tokenSymbol
    )}&tokenOut=${getTokenAddressBySymbol('FET')}&amountIn=${amount}`,
    fetcher
  )

  // -> OCEAN
  const { data: dataSwapToOcean, isValidating: isValidatingToOcean } = useSWR(
    `/api/quote/?tokenIn=${getTokenAddressBySymbol(
      tokenSymbol
    )}&tokenOut=${getTokenAddressBySymbol('OCEAN')}&amountIn=${amount}`,
    fetcher
  )

  return (
    <>
      <Result
        token={getTokenBySymbol('OCEAN')}
        amount={
          dataSwapToOcean?.amountOut / Number(`1e${dataSwapToOcean?.decimals}`)
        }
        amountAsi={
          (dataSwapToOcean?.amountOut /
            Number(`1e${dataSwapToOcean?.decimals}`)) *
          ratioOceanToAsi
        }
        amountFiat={
          (dataSwapToOcean?.amountOut /
            Number(`1e${dataSwapToOcean?.decimals}`)) *
          ratioOceanToAsi *
          prices.asi
        }
        amountOriginalFiat={
          tokenSymbol
            ? (dataSwapToOcean?.amountOut /
                Number(`1e${dataSwapToOcean?.decimals}`)) *
              prices[
                tokenSymbol.toLowerCase() as 'ocean' | 'agix' | 'fet' | 'asi'
              ]
            : undefined
        }
        isValidating={isValidatingToOcean || isValidatingPrices}
      />

      <Result
        token={getTokenBySymbol('AGIX')}
        amount={
          dataSwapToAgix?.amountOut / Number(`1e${dataSwapToAgix?.decimals}`)
        }
        amountAsi={
          (dataSwapToAgix?.amountOut /
            Number(`1e${dataSwapToAgix?.decimals}`)) *
          ratioAgixToAsi
        }
        amountFiat={
          (dataSwapToAgix?.amountOut /
            Number(`1e${dataSwapToAgix?.decimals}`)) *
          ratioAgixToAsi *
          prices.asi
        }
        amountOriginalFiat={
          (dataSwapToAgix?.amountOut /
            Number(`1e${dataSwapToAgix?.decimals}`)) *
          prices.agix
        }
        isValidating={isValidatingToAgix || isValidatingPrices}
      />

      <Result
        token={getTokenBySymbol('FET')}
        amount={
          dataSwapToFet?.amountOut / Number(`1e${dataSwapToFet?.decimals}`)
        }
        amountAsi={
          (dataSwapToFet?.amountOut / Number(`1e${dataSwapToFet?.decimals}`)) *
          ratioFetToAsi
        }
        amountFiat={
          (dataSwapToFet?.amountOut / Number(`1e${dataSwapToFet?.decimals}`)) *
          prices.asi
        }
        amountOriginalFiat={
          (dataSwapToFet?.amountOut / Number(`1e${dataSwapToFet?.decimals}`)) *
          prices.asi
        }
        isValidating={isValidatingToFet || isValidatingPrices}
      />
    </>
  )
}
