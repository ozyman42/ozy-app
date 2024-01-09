export const AUTH_COOKIE_NAME = 'auth';
export const EXPIRE_AUTH_COOKIE_HEADER = `${AUTH_COOKIE_NAME}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT`;
export const APP_DISPLAY_NAME = require('../../app/capacitor.config.json').appName;
export const APP_NAME = 'ozy-app';
export const APP_VERSION = process.env.APP_VERSION;
export const DEV_PASSTHROUGH_HOSTNAME = `127.0.0.1:${APP_VERSION === 'prod' ? '4000' : '3000'}`;
export const DOMAIN = 'beta.ozy.xyz';
