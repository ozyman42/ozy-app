export const APP_VERSION = process.env.APP_VERSION;
export const DEV_PASSTHROUGH_HOSTNAME = `127.0.0.1:${APP_VERSION === 'prod' ? '4000' : '3000'}`;

requireEnv(APP_VERSION, 'APP_VERSION');

function requireEnv(env: string | undefined, name: string) {
  if (typeof env !== 'string') {
    throw new Error(`process.env.${name} is not defined`);
  }
}
