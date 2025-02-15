import { z } from 'zod';
import { requireConst } from './';

const HCP_CLIENT_ID = 'jczhy5x223DWYNHLHeksmWP3vbGZNZlC';
const HCP_ORG_ID = '7eec81da-407d-4add-9f37-92ef2b069b37';
const HCP_PROJECT_ID = '9776411c-668a-451e-9f76-2c7299e42dd1';
const HCP_APP_NAME = 'ozy-app';

export enum Secrets {
  GoogleCloudProjectId = 'GOOGLE_CLOUD_PROJECT_ID',
  GoogleCloudServiceAccount = 'GOOGLE_CLOUD_SERVICE_ACCOUNT',
  OzyAppAuthKey = 'OZY_AUTH_KEY',
  OzyAppPepper = 'OZY_PEPPER',
  PostgresInternalUrl = 'POSTGRES_INTERNAL_URL',
  PostgresPublicUrl = 'POSTGRES_PUBLIC_URL',
  RecaptchaId = 'RECAPTCHA_ID',
}

type AccessTokenResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
}

const HCPSecretSchema = z.object({
  name: z.string(),
  type: z.literal('kv'),
  latest_version: z.number(),
  created_at: z.string(), // i.e. 2025-02-13T08:47:46.580218Z
  created_by_id: z.string(),
  sync_status: z.object({}),
  static_version: z.object({
    version: z.number(),
    value: z.string(),
    created_at: z.string(),
    created_by_id: z.string()
  }).strict()
}).strict();

const HCPSecretsResponseSchema = z.object({
  secrets: z.array(HCPSecretSchema),
  pagination: z.object({
    next_page_token: z.string(),
    previous_page_token: z.string()
  })
});

let cache: PersistentCache | undefined = undefined;
class PersistentCache {
  private static TABLE_NAME = 'kv_store';
  private static KEY_COL_NAME = 'k';
  private static VAL_COL_NAME = 'v';
  private db: import('better-sqlite3').Database;
  public async init() {
    const path = await import('path');
    const cachePath = path.resolve(__dirname, 'cache.sql');
    console.log('cache path of', cachePath);
    const SQLite = await import('better-sqlite3');
    console.log()
    this.db = new SQLite(cachePath, {});
    const {TABLE_NAME, KEY_COL_NAME, VAL_COL_NAME} = PersistentCache;
    const info = this.db.prepare(
      `CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (${KEY_COL_NAME} STRING PRIMARY KEY, ${VAL_COL_NAME} STRING);`
    ).run();
    console.log('created?', info.changes);
  }

  public async get(k: string): Promise<string | undefined> {
    const {TABLE_NAME, KEY_COL_NAME, VAL_COL_NAME} = PersistentCache;
    const statement = this.db.prepare(`SELECT ${VAL_COL_NAME} FROM ${TABLE_NAME} WHERE ${KEY_COL_NAME} = ?`);
    const result = statement.get(k);
    console.log('result of', result);
    return undefined;
  }

  public async set(k: string, v: string) {
    const {TABLE_NAME, KEY_COL_NAME, VAL_COL_NAME} = PersistentCache;
    const statement = this.db.prepare(`INSERT OR REPLACE INTO ${TABLE_NAME} (${KEY_COL_NAME}, ${VAL_COL_NAME}) VALUES (?, ?)`);
    const info = statement.run(k, v);
    console.log('inserted?', info.changes);
  }
}

async function getCache() {
  if (cache) return cache;
  cache = new PersistentCache();
  await cache.init();
  return cache;
}

let shortLivedAccessToken: Promise<{token: string; expiry: number}> | undefined = undefined;
async function tempAccessToken() {
  // We require from within this method in case frontend code loads this module without
  // using it
  const HCP_CLIENT_SECRET = process.env.HCP_CLIENT_SECRET;
  requireConst(HCP_CLIENT_SECRET, 'process.env.HCP_CLIENT_SECRET');
  const now = Date.now();
  const FIVE_SECONDS = 5 * 1000;
  // const cache = await getCache();
  // const accessTokenKey = 'access-token';
  // const cachedToken = cache.get(accessTokenKey);
  // console.log('cachedToken', cachedToken);
  if (shortLivedAccessToken && ((await shortLivedAccessToken).expiry < FIVE_SECONDS + now)) {
    shortLivedAccessToken = undefined;
  }
  if (!shortLivedAccessToken) {
    shortLivedAccessToken = (async () => {
      const preReqTime = Date.now();
      const accessToken: AccessTokenResponse = await (await fetch(
        "https://auth.idp.hashicorp.com/oauth2/token",
        {
          method: "POST",
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: new URLSearchParams({
            client_id: HCP_CLIENT_ID,
            client_secret: HCP_CLIENT_SECRET!,
            grant_type: 'client_credentials',
            audience: 'https://api.hashicorp.cloud'
          })
        }
      )).json();
      return {
        token: accessToken.access_token,
        expiry: preReqTime + (accessToken.expires_in * 1000)
      };
    })();
    // cache.set(accessTokenKey, JSON.stringify(shortLivedAccessToken));
  }
  const {token} = await shortLivedAccessToken;
  return token;
}

const secretCache = new Map<string, string>();
async function fetchSecretFromHashicorp(secret: Secrets): Promise<string | undefined> {
  const accessToken = await tempAccessToken();
  const secretsResponse = (await (await fetch(
    'http://localhost:5000', {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'x-target-url': `https://api.cloud.hashicorp.com/secrets/2023-11-28/organizations/${HCP_ORG_ID}/projects/${HCP_PROJECT_ID}/apps/${HCP_APP_NAME}/secrets:open`
    },
    cache: 'force-cache'
  })).json());
  const secrets = HCPSecretsResponseSchema.parse(secretsResponse);
  for (const curSecret of secrets.secrets) {
    const value = curSecret.static_version.value;
    secretCache.set(curSecret.name, value);
  }
  return secretCache.get(secret);
}

export async function getSecret(secret: Secrets): Promise<string> {
  const cachedSecret = secretCache.get(secret);
  if (cachedSecret) {
    return cachedSecret;
  }
  const hcpSecret =  await fetchSecretFromHashicorp(secret);
  requireConst(hcpSecret, secret);
  return hcpSecret!;
}
