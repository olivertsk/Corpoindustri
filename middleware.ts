import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const response = NextResponse.next({
    request: {
      headers: new Headers(req.headers),
    },
  });

  const noIndexPaths = ['/auth', '/admin', '/profile', '/logout'];
  const shouldNoIndex = noIndexPaths.some((path) => pathname.startsWith(path));

  if (shouldNoIndex) {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
  }

  return response;
}
