import { drizzle } from 'drizzle-orm/node-postgres';
import * as schemaDefs from './schema';
import { Client } from 'pg';

const client = new Client({connectionString: process.env.OZY_POSTGRES_URL});

async function getDB() {
    await client.connect();
    return drizzle(client, {schema: schemaDefs});
}

export const dbPromise = getDB();
export const schema = schemaDefs;
export * as drizzle from 'drizzle-orm';
