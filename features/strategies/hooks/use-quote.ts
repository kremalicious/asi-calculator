'use client'

import { fetcher, getTokenAddressBySymbol } from '@/lib'
import type { TokenSymbol } from '@/types'
import useSWR from 'swr'

const options = {
  keepPreviousData: true // so loading UI can kick in properly
}

export function useQuote(
  tokenSymbol: TokenSymbol,
  amount: number,
  shouldFetch: boolean
) {
  // -> AGIX
  const {
    data: dataSwapToAgix,
    isValidating: isValidatingToAgix,
    isLoading: isLoadingToAgix
  } = useSWR(
    shouldFetch
      ? `/api/quote/?tokenIn=${getTokenAddressBySymbol(
          tokenSymbol
        )}&tokenOut=${getTokenAddressBySymbol('AGIX')}&amountIn=${amount}`
      : null,
    fetcher,
    options
  )

  // -> FET
  const {
    data: dataSwapToFet,
    isValidating: isValidatingToFet,
    isLoading: isLoadingToFet
  } = useSWR(
    shouldFetch
      ? `/api/quote/?tokenIn=${getTokenAddressBySymbol(
          tokenSymbol
        )}&tokenOut=${getTokenAddressBySymbol('FET')}&amountIn=${amount}`
      : null,
    fetcher,
    options
  )

  // -> OCEAN
  const {
    data: dataSwapToOcean,
    isValidating: isValidatingToOcean,
    isLoading: isLoadingToOcean
  } = useSWR(
    shouldFetch
      ? `/api/quote/?tokenIn=${getTokenAddressBySymbol(
          tokenSymbol
        )}&tokenOut=${getTokenAddressBySymbol('OCEAN')}&amountIn=${amount}`
      : null,
    fetcher,
    options
  )

  // -> CUDOS
  const {
    data: dataSwapToCudos,
    isValidating: isValidatingToCudos,
    isLoading: isLoadingToCudos
  } = useSWR(
    shouldFetch
      ? `/api/quote/?tokenIn=${getTokenAddressBySymbol(
          tokenSymbol
        )}&tokenOut=${getTokenAddressBySymbol('CUDOS')}&amountIn=${amount}`
      : null,
    fetcher,
    options
  )

  const amountToOcean =
    dataSwapToOcean?.amountOut / Number(`1e${dataSwapToOcean?.decimals}`)
  const amountToAgix =
    dataSwapToAgix?.amountOut / Number(`1e${dataSwapToAgix?.decimals}`)
  const amountToCudos =
    dataSwapToAgix?.amountOut / Number(`1e${dataSwapToCudos?.decimals}`)
  const amountToFet =
    dataSwapToFet?.amountOut / Number(`1e${dataSwapToFet?.decimals}`)

  return shouldFetch
    ? {
        amountToOcean,
        amountToAgix,
        amountToFet,
        amountToCudos,
        isValidatingToAgix,
        isLoadingToAgix,
        isValidatingToFet,
        isLoadingToFet,
        isValidatingToOcean,
        isLoadingToOcean,
        isValidatingToCudos,
        isLoadingToCudos
      }
    : {
        amountToOcean: undefined,
        amountToAgix: undefined,
        amountToCudos: undefined,
        amountToFet: undefined,
        isValidatingToAgix: false,
        isLoadingToAgix: false,
        isValidatingToFet: false,
        isLoadingToFet: false,
        isValidatingToOcean: false,
        isLoadingToOcean: false,
        isValidatingToCudos: false,
        isLoadingToCudos: false
      }
}
