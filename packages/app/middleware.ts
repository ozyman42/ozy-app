import { NextRequest, NextResponse } from 'next/server';
import { NoAuthRequiredRoutes } from '@/common/universal/auth-paths';
import { AUTH_COOKIE_NAME, EXPIRE_AUTH_COOKIE_HEADER, LOGIN_PAGE_PATH, MAIN_APP_PAGE_PATH, SESSION_ID_MIDDLEWARE_HEADER } from '@ozy/constants';
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
        console.log(`redirecting from ${url.pathname} to ${LOGIN_PAGE_PATH}`);
        return NextResponse.redirect(new URL(LOGIN_PAGE_PATH, req.url), {headers});
      }
    } else if (url.pathname === LOGIN_PAGE_PATH) {
      console.log(`redirecting from ${url.pathname} to ${MAIN_APP_PAGE_PATH}`)
      return NextResponse.redirect(new URL(MAIN_APP_PAGE_PATH, req.url));
    } else {
      req.headers.append(SESSION_ID_MIDDLEWARE_HEADER, authStatus.sessionId);
      return NextResponse.next({request: {headers: req.headers}});
    }
  }
  return NextResponse.next();
}
