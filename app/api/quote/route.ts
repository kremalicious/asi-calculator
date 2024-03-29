import { type NextRequest } from 'next/server'

export const runtime = 'edge'

const apiUrl = 'https://api.1inch.dev/swap/v6.0/1/quote'

const config: RequestInit = {
  headers: {
    Authorization: `Bearer ${process.env.ONEINCH_API_KEY}`,
    accept: 'application/json',
    'content-type': 'application/json'
  },
  method: 'GET',
  next: { revalidate: 60 }
}

export async function GET(request: NextRequest) {
  const searchParams = request?.nextUrl?.searchParams
  const src = searchParams?.get('src')
  const dst = searchParams?.get('dst')
  const amount = searchParams?.get('amount')

  if (!src || !dst || !amount) {
    return Response.json(null, { status: 400 })
  }

  let data
  const url = `${apiUrl}/?src=${src}&dst=${dst}&amount=${amount}&includeTokensInfo=true&includeProtocols=true`

  try {
    const res = await fetch(url, config)
    const json = await res.json()

    data = json
  } catch (error: unknown) {
    console.error((error as Error).message)
    data = null
  }

  return Response.json(data)
}
