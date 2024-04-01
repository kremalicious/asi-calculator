import { type NextRequest } from 'next/server'

export const runtime = 'edge'

const apiUrl = process.env.WEB3_API_URL

const config: RequestInit = {
  headers: {
    'content-type': 'application/json'
  },
  method: 'GET',
  next: { revalidate: 30 }
}

export async function GET(request: NextRequest) {
  const searchParams = request?.nextUrl?.searchParams
  const tokenIn = searchParams?.get('tokenIn')
  const tokenOut = searchParams?.get('tokenOut')
  const amountIn = searchParams?.get('amountIn')

  if (!tokenIn || !tokenOut || !amountIn)
    return Response.json(null, { status: 400 })

  const url = `${apiUrl}/quote?tokenIn=${tokenIn}&tokenOut=${tokenOut}&amountIn=${amountIn}`
  let data
  let status

  try {
    const res = await fetch(url, config)
    const json = await res.json()

    data = json
    status = res.status
  } catch (error: unknown) {
    console.error((error as Error).message)
    data = null
    status = 500
  }

  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
