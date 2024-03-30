'use client'

import { tokens } from '@/constants'
import { fetcher } from '@/utils'
import useSWR from 'swr'

export function usePrices() {
  const { data: dataPrices } = useSWR(
    `/api/prices/?tokens=${tokens.toString()}`,
    fetcher
  )

  const ocean = dataPrices?.[tokens[0]]?.usd || 0
  const fet = dataPrices?.[tokens[1]]?.usd || 0
  const agix = dataPrices?.[tokens[2]]?.usd || 0
  const asi = fet

  return { ocean, fet, agix, asi }
}
