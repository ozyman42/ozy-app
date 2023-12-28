export const APP_DISPLAY_NAME = require('../../app/capacitor.config.json').appName;
export const APP_NAME = 'ozy-app';
export const DB_NAME = `${APP_NAME}-db`;
export const DB_USER_NAME = `${DB_NAME}-user`;
export const DB_USER_PASSWORD = process.env.OZY_COCKROACH_DB_USER_PASSWORD;
export const APP_VERSION = process.env.APP_VERSION;
export const DEV_PASSTHROUGH_HOSTNAME = `127.0.0.1:${APP_VERSION === 'prod' ? '4000' : '3000'}`;
export const MONGO_ORG_ID = '6403bde30b7bf303e9f560c8';
export const INFRA_REGION = 'CENTRAL_US';
