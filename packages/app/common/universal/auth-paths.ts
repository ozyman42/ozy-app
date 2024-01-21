import { LOGIN_PAGE_PATH } from "@ozy/constants";

export const NoAuthRequiredRoutes = new Set([
    LOGIN_PAGE_PATH,
    '/api/auth/login',
    '/api/auth/sign-up',
    '/api/auth/status',
    '/api/health/dev',
    '/api/health',
    '/api/version',
    '/favicon.ico'
]);
