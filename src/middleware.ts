import { getSessionCookie } from 'better-auth/cookies';

import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const ONLY_NOT_AUTHORIZED_ROUTES = ['/login', '/register', 'dashboard/*'];
const ONLY_AUTHORIZED_ROUTES = ['/dashboard', '/profile'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAuth = getSessionCookie(request);
  const isAuthorized = ONLY_AUTHORIZED_ROUTES.some((route) => pathname.startsWith(route));
  const isNotAuthorized = ONLY_NOT_AUTHORIZED_ROUTES.some((route) => pathname.startsWith(route));

  if (pathname === '/') {
    const redirectUrl = isAuth ? '/dashboard' : '/login';
    return NextResponse.redirect(new URL(redirectUrl, request.url));
  }

  if (isAuthorized && !isAuth) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  if (isNotAuthorized && isAuth) {
    const dashboardUrl = new URL('/dashboard', request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)'],
};
