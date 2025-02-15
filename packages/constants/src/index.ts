export const AUTH_COOKIE_NAME = 'auth';
export const DOMAIN = 'beta.ozy.xyz';
export const EXPIRE_AUTH_COOKIE_HEADER = `${AUTH_COOKIE_NAME}=; Path=/; Domain=${DOMAIN}; HttpOnly; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Secure; SameSite=Strict`;
export const APP_DISPLAY_NAME = require('../../app/capacitor.config.json').appName;
export const APP_NAME = 'ozy-app';
export const SESSION_ID_MIDDLEWARE_HEADER = 'sessionid';
export const USER_ID_MIDDLEWARE_HEADER = 'userid';
export const LOGIN_PAGE_PATH = '/login';
export const MAIN_APP_PAGE_PATH = '/';
export function requireConst(maybeConst: string | undefined, name: string) {
  if (typeof maybeConst !== 'string') {
    throw new Error(`${name} is not defined`);
  }
}
