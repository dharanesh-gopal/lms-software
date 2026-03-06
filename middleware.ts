import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  // Skip third-party tracker requests completely
  if (request.nextUrl.pathname.includes('/hybridaction/')) {
    return new NextResponse(JSON.stringify({ status: 'ok' }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
      },
    })
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - but DO match hybridaction paths
     */
    '/((?!_next/static|_next/image|favicon.ico|api).*)',
  ],
}
