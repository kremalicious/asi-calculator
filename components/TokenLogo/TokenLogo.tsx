import { Token } from '@/types'
import Image from 'next/image'
import styles from './TokenLogo.module.css'

export function TokenLogo({
  token,
  size = 24
}: {
  token: Token | undefined
  size?: number
}) {
  return token ? (
    <span className={styles.logo} data-symbol={token.symbol}>
      <Image
        src={`https://tokens.1inch.io/${token.address}.png`}
        width={size}
        height={size}
        alt={token.symbol}
      />
    </span>
  ) : null
}
