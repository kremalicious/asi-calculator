type Props = {
  symbol: string
  amount: number
  amountAsi: number
  amountFiat: number
}

export function Result({ symbol, amount, amountAsi, amountFiat }: Props) {
  return (
    <p>
      <span>{symbol}</span> {amount} {symbol}, convertible to{' '}
      <strong>{amountAsi} ASI</strong> currently worth{' '}
      <strong>${amountFiat.toFixed(2)}</strong>.
    </p>
  )
}
