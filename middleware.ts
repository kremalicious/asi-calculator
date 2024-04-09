import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const language =
    request.headers
      .get('accept-language')
      ?.split(',')?.[0]
      .split('-')?.[0]
      .toLowerCase() || 'en'
  const response = NextResponse.next()
  if (language) response.headers.set('x-language', language)

  return response
}
