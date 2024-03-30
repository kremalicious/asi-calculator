import { Dispatch, SetStateAction } from 'react'
import styles from './InputToken.module.css'
import { CaretDownIcon } from '@radix-ui/react-icons'
import { Token } from '../types'

export function InputToken({
  token,
  setToken,
  isFiat
}: {
  token: Token
  isFiat?: boolean
  setToken?: Dispatch<SetStateAction<Token>>
}) {
  return (
    <span className={styles.selectWrapper}>
      <select
        className={styles.select}
        onChange={(e) => (setToken ? setToken(e.target.value as Token) : null)}
        value={token}
        disabled={!setToken}
      >
        {isFiat ? (
          <option value="usd">USD</option>
        ) : (
          <>
            <option value="ocean">OCEAN</option>
            <option value="fet">FET</option>
            <option value="agix">AGIX</option>
          </>
        )}
      </select>
      {setToken ? <CaretDownIcon className={styles.icon} /> : null}
    </span>
  )
}
