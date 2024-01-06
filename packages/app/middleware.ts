import { NextRequest, NextResponse } from 'next/server';
import { NoAuthRequiredRoutes } from '@/common/universal/auth-paths';
import { AUTH_COOKIE_NAME, EXPIRE_AUTH_COOKIE_HEADER } from '@ozy/constants';
import { AuthStatusResponse } from './common/universal/api-interfaces';

function requiresAuth(url: URL) {
  return (
    !NoAuthRequiredRoutes.has(url.pathname) &&
    !url.pathname.startsWith('/_next/static/')
  )
}

function isAPI(url: URL) {
  return url.pathname.startsWith('/api/');
}

export async function middleware(req: NextRequest, res: NextResponse) {
  const url = new URL(req.url);
  if (requiresAuth(url)) {
    const authCookie = req.cookies.get(AUTH_COOKIE_NAME)?.value;
    const authStatus: AuthStatusResponse = 
      await (
        await fetch(
          'http://localhost:3000/api/auth/status', 
          {headers: req.headers}
        )
      ).json();
    if (!authStatus.isAuthed) {
      const headers: any = {};
      if (authCookie) {
        headers['Set-Cookie'] = EXPIRE_AUTH_COOKIE_HEADER;
      }
      if (isAPI(url)) {
        return NextResponse.json({error: 'unauthorized'}, {status: 401, headers});
      } else {
        return NextResponse.redirect(new URL('/login', req.url), {headers});
      }
    } else {
      req.headers.append('sessionid', authStatus.sessionId);
      return NextResponse.next({request: {headers: req.headers}});
    }
  }
  return NextResponse.next();
}
