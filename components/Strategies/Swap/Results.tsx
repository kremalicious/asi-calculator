import { Result } from '@/components/ResultRow'
import {
  ratioOceanToAsi,
  ratioAgixToAsi,
  ratioFetToAsi,
  tokens
} from '@/constants'
import { usePrices } from '@/hooks'
import { fetcher, getTokenBySymbol } from '@/utils'
import useSWR from 'swr'
import { TokenSymbol } from '@/types'

export function SwapResults({
  token,
  amount
}: {
  token: TokenSymbol
  amount: number
}) {
  const { prices, isValidating: isValidatingPrices } = usePrices()
  const { data: dataSwapOceanToAgix, isValidating: isValidatingOceanToAgix } =
    useSWR(
      `/api/quote/?tokenIn=${tokens[0].address}&tokenOut=${tokens[2].address}&amountIn=${amount}`,
      fetcher
    )

  const { data: dataSwapOceanToFet, isValidating: isValidatingOceanToFet } =
    useSWR(
      `/api/quote/?tokenIn=${tokens[0].address}&tokenOut=${tokens[1].address}&amountIn=${amount}`,
      fetcher
    )

  return (
    <>
      <Result
        token={getTokenBySymbol('OCEAN')}
        amount={amount}
        amountAsi={amount * ratioOceanToAsi}
        amountFiat={amount * ratioOceanToAsi * prices.asi}
        amountOriginalFiat={
          token
            ? amount *
              prices[token.toLowerCase() as 'ocean' | 'agix' | 'fet' | 'asi']
            : undefined
        }
        isValidating={
          isValidatingOceanToAgix ||
          isValidatingOceanToFet ||
          isValidatingPrices
        }
      />

      <Result
        token={getTokenBySymbol('AGIX')}
        amount={
          dataSwapOceanToAgix?.amountOut /
            Number(`1e${dataSwapOceanToAgix?.decimals}`) || 0
        }
        amountAsi={
          (dataSwapOceanToAgix?.amountOut /
            Number(`1e${dataSwapOceanToAgix?.decimals}`) || 0) * ratioAgixToAsi
        }
        amountFiat={
          (dataSwapOceanToAgix?.amountOut /
            Number(`1e${dataSwapOceanToAgix?.decimals}`) || 0) *
          ratioAgixToAsi *
          prices.asi
        }
        amountOriginalFiat={
          (dataSwapOceanToAgix?.amountOut /
            Number(`1e${dataSwapOceanToAgix?.decimals}`) || 0) * prices.agix
        }
        isValidating={isValidatingOceanToAgix || isValidatingPrices}
      />

      <Result
        token={getTokenBySymbol('FET')}
        amount={
          dataSwapOceanToFet?.amountOut /
            Number(`1e${dataSwapOceanToFet?.decimals}`) || 0
        }
        amountAsi={
          (dataSwapOceanToFet?.amountOut /
            Number(`1e${dataSwapOceanToFet?.decimals}`) || 0) * ratioFetToAsi
        }
        amountFiat={
          (dataSwapOceanToFet?.amountOut /
            Number(`1e${dataSwapOceanToFet?.decimals}`) || 0) * prices.asi
        }
        amountOriginalFiat={
          (dataSwapOceanToFet?.amountOut /
            Number(`1e${dataSwapOceanToFet?.decimals}`) || 0) * prices.asi
        }
        isValidating={isValidatingOceanToFet || isValidatingPrices}
      />
    </>
  )
}
