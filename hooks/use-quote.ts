import { TokenSymbol } from '@/types'
import { getTokenAddressBySymbol, fetcher } from '@/utils'
import useSWR from 'swr'

const options = {
  keepPreviousData: true // so loading UI can kick in properly
}

export function useQuote(tokenSymbol: TokenSymbol, amount: number) {
  // -> AGIX
  const {
    data: dataSwapToAgix,
    isValidating: isValidatingToAgix,
    isLoading: isLoadingToAgix
  } = useSWR(
    `/api/quote/?tokenIn=${getTokenAddressBySymbol(
      tokenSymbol
    )}&tokenOut=${getTokenAddressBySymbol('AGIX')}&amountIn=${amount}`,
    fetcher,
    options
  )

  // -> FET
  const {
    data: dataSwapToFet,
    isValidating: isValidatingToFet,
    isLoading: isLoadingToFet
  } = useSWR(
    `/api/quote/?tokenIn=${getTokenAddressBySymbol(
      tokenSymbol
    )}&tokenOut=${getTokenAddressBySymbol('FET')}&amountIn=${amount}`,
    fetcher,
    options
  )

  // -> OCEAN
  const {
    data: dataSwapToOcean,
    isValidating: isValidatingToOcean,
    isLoading: isLoadingToOcean
  } = useSWR(
    `/api/quote/?tokenIn=${getTokenAddressBySymbol(
      tokenSymbol
    )}&tokenOut=${getTokenAddressBySymbol('OCEAN')}&amountIn=${amount}`,
    fetcher,
    options
  )

  const amountToOcean =
    dataSwapToOcean?.amountOut / Number(`1e${dataSwapToOcean?.decimals}`)
  const amountToAgix =
    dataSwapToAgix?.amountOut / Number(`1e${dataSwapToAgix?.decimals}`)
  const amountToFet =
    dataSwapToFet?.amountOut / Number(`1e${dataSwapToFet?.decimals}`)

  return {
    amountToOcean,
    amountToAgix,
    amountToFet,
    isValidatingToAgix,
    isLoadingToAgix,
    isValidatingToFet,
    isLoadingToFet,
    isValidatingToOcean,
    isLoadingToOcean
  }
}
