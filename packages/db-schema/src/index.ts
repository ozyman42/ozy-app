import { NodePgDatabase, drizzle } from 'drizzle-orm/node-postgres';
import * as schemaDefs from './schema';
import { Pool } from 'pg';
import { Secrets, getSecret } from '@ozy/constants/src/secrets';

const poolCache = new Map<string, Pool>();
async function getPool(dbUrl: string) {
  const cachedPool = poolCache.get(dbUrl);
  if (cachedPool) return cachedPool;
  const pool = new Pool({
    connectionString: dbUrl
  });
  poolCache.set(dbUrl, pool);
  return pool;
}
export type UsingDbFn = ReturnType<typeof dbConnectionFactoryFactory>['usingDb'];

export const dbConnectionFactoryFactory = (dbUrlGetter: () => Promise<string>) => {
  const dbUrl = dbUrlGetter();
  return {
    usingDb: async <T> (fn: (connection: NodePgDatabase<typeof schemaDefs>) => Promise<T>) => {
      const pool = await getPool(await dbUrl);
      const client = await pool.connect();
      const connection = drizzle(pool, {schema: schemaDefs});
      try {
        const result = await fn(connection);
        return result;
      } finally {
        client.release();
      }
    }
  }
};

export const usingDbThruPublicInternet = dbConnectionFactoryFactory(() => getSecret(Secrets.PostgresPublicUrl)).usingDb;

// TODO: maybe use Kysley instead
// https://github.com/kysely-org/kysely
export const schema = schemaDefs;
export * as drizzle from 'drizzle-orm';
