import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const response = NextResponse.next({
    request: {
      headers: new Headers(req.headers),
    },
  });

  console.log('aqui en mw', req.cookies.get('token'), req.nextUrl.pathname);
  response.headers.set('x-logueado', '1234');
  return response;
}
