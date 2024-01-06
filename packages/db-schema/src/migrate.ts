import { dbPromise } from './';
import { migrate } from 'drizzle-orm/postgres-js/migrator';

async function main() {
    const db = await dbPromise;
    console.log('migration started...');
    await migrate(db, {migrationsFolder: 'drizzle'});
    console.log('migration finished!');
}

main()
    .catch((e: Error) => {
        console.log('caught erro while trying to migrate');
        console.log(e);
        process.exit(1);
    })
    .finally(() => {
        process.exit(0);
    });