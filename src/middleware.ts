import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {

  const requestUrlPath = request.nextUrl.pathname;

  if (requestUrlPath.startsWith('/home') && !request.cookies.has('token')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  else if (requestUrlPath === '/login' && request.cookies.has('token')) {
    return NextResponse.redirect(new URL('/home', request.url));
  }
  else if (requestUrlPath === '/') {
    if (request.cookies.has('token')) {
      return NextResponse.redirect(new URL('/home', request.url));
    } else {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
}