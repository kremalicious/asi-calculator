type Props = {
  symbol: string
  price: number
  priceAsi: number
  ratio: number
  exampleBuyInUsd: number
}

export function Result({
  symbol,
  price,
  priceAsi,
  ratio,
  exampleBuyInUsd
}: Props) {
  return (
    <p>
      <span>{symbol}</span> You will get {exampleBuyInUsd / price} {symbol},
      convertible to <strong>{(exampleBuyInUsd / price) * ratio} ASI</strong>{' '}
      currently worth{' '}
      <strong>
        ${((exampleBuyInUsd / price) * ratio * priceAsi).toFixed(2)}
      </strong>
      .
    </p>
  )
}
