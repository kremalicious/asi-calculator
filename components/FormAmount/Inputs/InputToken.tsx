'use client'

import { Dispatch, SetStateAction } from 'react'
import styles from './InputToken.module.css'
import { CaretDownIcon } from '@radix-ui/react-icons'
import { TokenSymbol } from '@/types'
import { useSWRConfig } from 'swr'

export function InputToken({
  token,
  setToken,
  isFiat
}: {
  token: TokenSymbol | string
  isFiat?: boolean
  setToken?: Dispatch<SetStateAction<TokenSymbol>>
}) {
  const { mutate } = useSWRConfig()

  return (
    <span className={styles.selectWrapper}>
      <select
        className={styles.select}
        onChange={(e) => {
          if (!setToken) return

          setToken(e.target.value as TokenSymbol)
          mutate('/api/quote')
        }}
        value={token}
        disabled={!setToken}
        style={setToken ? { paddingRight: '1.25rem' } : {}}
      >
        {isFiat ? (
          <option value="USD">USD</option>
        ) : (
          <>
            <option value="OCEAN">OCEAN</option>
            <option value="FET">FET</option>
            <option value="AGIX">AGIX</option>
          </>
        )}
      </select>
      {setToken ? <CaretDownIcon className={styles.icon} /> : null}
    </span>
  )
}
