import { drizzle } from 'drizzle-orm/node-postgres';
import * as schemaDefs from './schema';
import { Client, Pool } from 'pg';

const pool = new Pool({
    connectionString: process.env.OZY_POSTGRES_URL
})

async function getDB() {
    await pool.connect();
    return drizzle(pool, {schema: schemaDefs});
}

// TODO: maybe use Kysley instead
// https://github.com/kysely-org/kysely
export const dbPromise = getDB();
export const schema = schemaDefs;
export * as drizzle from 'drizzle-orm';
