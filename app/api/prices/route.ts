import { type NextRequest } from 'next/server'

export const runtime = 'edge'

const apiUrl = process.env.WEB3_API_URL

const config: RequestInit = {
  headers: {
    'content-type': 'application/json'
  },
  method: 'GET',
  next: { revalidate: 60 }
}

export async function GET(request: NextRequest) {
  const searchParams = request?.nextUrl?.searchParams
  const tokens = searchParams?.get('tokens')

  if (!tokens) {
    return Response.json(null, { status: 400 })
  }

  const url = `${apiUrl}/prices?tokens=${tokens}`
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
      'Content-Type': 'application/json',
      'Cache-Control': 'public, s-max-age=60'
    }
  })
}
