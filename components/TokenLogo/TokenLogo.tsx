import { Token } from '@/types'
import styles from './TokenLogo.module.css'
import oceanImage from '@/images/ocean.png'
import agixImage from '@/images/agix.png'
import fetImage from '@/images/fet.png'
import asiImage from '@/images/asi.png'

export function TokenLogo({
  token,
  size = 24
}: {
  token: Token | undefined
  size?: number
}) {
  const imageSrc =
    token?.symbol === 'OCEAN'
      ? oceanImage
      : token?.symbol === 'AGIX'
        ? agixImage
        : token?.symbol === 'ASI'
          ? asiImage
          : fetImage

  return token ? (
    <span className={styles.logo} data-symbol={token.symbol}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageSrc.src}
        width={size}
        height={size}
        alt={`${token.symbol} Logo`}
      />
    </span>
  ) : null
}
