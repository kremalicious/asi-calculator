import { NextResponse, type NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // add x-locale header to all responses
  const locale =
    request.headers.get('accept-language')?.split(',')?.[0] || 'en-US'
  const response = NextResponse.next()
  response.headers.set('x-locale', locale)

  return response
}
