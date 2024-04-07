import { NodePgDatabase, drizzle } from 'drizzle-orm/node-postgres';
import * as schemaDefs from './schema';
import { Client, Pool } from 'pg';

const pool = new Pool({
    connectionString: process.env.OZY_POSTGRES_URL
})

export async function usingDb<T>(fn: (connection: NodePgDatabase<typeof schemaDefs>) => Promise<T>): Promise<T> {
  const client = await pool.connect();
  const connection = drizzle(pool, {schema: schemaDefs});
  try {
    const result = await fn(connection);
    return result;
  } finally {
    client.release();
  }
}

// TODO: maybe use Kysley instead
// https://github.com/kysely-org/kysely
export const schema = schemaDefs;
export * as drizzle from 'drizzle-orm';
