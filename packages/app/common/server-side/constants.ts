import { requireConst } from '@ozy/constants';
import { getSecret, Secrets } from '@ozy/constants/src/secrets';
import { dbConnectionFactoryFactory } from '@ozy/db-schema';

export const APP_VERSION = process.env.APP_VERSION;
requireConst(APP_VERSION, 'process.env.APP_VERSION');
export const IS_PROD = APP_VERSION === 'prod';
export const DEV_PASSTHROUGH_HOSTNAME = `127.0.0.1:${IS_PROD ? '4000' : '3000'}`;
export const { usingDb } = dbConnectionFactoryFactory(
  () => getSecret(IS_PROD ? Secrets.PostgresInternalUrl : Secrets.PostgresPublicUrl)
);
