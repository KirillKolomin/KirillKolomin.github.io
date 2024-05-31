import { NextRequest, NextResponse } from 'next/server';
import { AUTH_COOKIE, REDIRECT_URL_QUERY } from '@exchange-gateway/shared/tokens/auth';

export function middleware(request: NextRequest): NextResponse | void {
  const currentUser = request.cookies.get(AUTH_COOKIE)?.value;
  const { url } = request;
  const pathName = request.nextUrl.pathname;
  const rawRedirectUrl = new URLSearchParams(request.nextUrl.search).get(REDIRECT_URL_QUERY);

  if (currentUser && rawRedirectUrl) {
    const redirectUrl = decodeURIComponent(rawRedirectUrl);
    return NextResponse.redirect(new URL(redirectUrl));
  }

  if (!currentUser && !pathName.startsWith('/login')) {
    return NextResponse.redirect(new URL(`/login?${REDIRECT_URL_QUERY}=${encodeURIComponent(url)}`, url));
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
