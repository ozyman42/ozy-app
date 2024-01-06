import { dbPromise, schema, drizzle } from './';
import { sql } from 'drizzle-orm';
import * as crypto from 'crypto';

async function main() {
    const db = await dbPromise;

    async function LIST_TABLES() {
        const res = await db.execute(sql`SELECT tablename
        FROM pg_catalog.pg_tables
        WHERE schemaname != 'pg_catalog' AND schemaname != 'information_schema';
        `);
        return res.rows;
    }

    async function DROP_TABLE(name: string) {
        const res = await db.execute(sql.raw(`DROP TABLE ${name}`));
        return res.rows;
    }

    async function USERNAME(hashedUsername: string) {
        const res = await db.select()
            .from(schema.users)
            .where(drizzle.eq(schema.users.username, hashedUsername))
            .execute();
        return res;
    }

    async function INSERT_USER() {
        const res = await db.insert(schema.users)
            .values({
                username: 'rando',
                totp: 'hi'
            })
            .execute();
        return res.rows;
    }

    function DELETE_USER() {
        return db.delete(schema.users)
            .where(drizzle.eq(schema.users.username, 'rando'))
            .returning({ deletedId: schema.users.id });
    }

    const operation =
        //DROP_TABLE('app_vars')
        //LIST_TABLES
        USERNAME('rando')
        //INSERT_USER()
        //DELETE_USER()

    console.log(await operation);

main()
    .catch((e: Error) => {
        console.log('caught error while trying to run query');
        console.log(e);
        process.exit(1);
    })
    .finally(() => {
        process.exit(0);
    });