import { appRouter } from '@/common/server-side/trpc';
import * as trpcNext from '@trpc/server/adapters/next';
import { schema, drizzle, dbPromise } from '@ozy/db-schema';
import { SESSION_ID_MIDDLEWARE_HEADER } from '@ozy/constants';

export default trpcNext.createNextApiHandler({
    router: appRouter,
    createContext: async ({req}) => {
        const db = await dbPromise;
        const sessionId = req.headers[SESSION_ID_MIDDLEWARE_HEADER] as string;
        const { userId } = (await db.select()
            .from(schema.sessions)
            .where(drizzle.eq(schema.sessions.id, sessionId))
            .execute())[0];
        return { userId };
    }
});
