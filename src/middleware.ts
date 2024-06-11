import { cookies } from 'next/headers';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {

  const requestUrlPath = request.nextUrl.pathname;

  if (requestUrlPath.startsWith('/home') && !cookies().has('token')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  else if (requestUrlPath === '/login' && cookies().has('token')) {
    return NextResponse.redirect(new URL('/home', request.url));
  }
  else if (requestUrlPath === '/') {
    if (cookies().has('token')) {
      return NextResponse.redirect(new URL('/home', request.url));
    } else {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
}