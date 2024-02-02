import { appRouter } from '@/common/server-side/trpc';
import * as trpcNext from '@trpc/server/adapters/next';
import { USER_ID_MIDDLEWARE_HEADER } from '@ozy/constants';

export default trpcNext.createNextApiHandler({
    router: appRouter,
    createContext: async ({req}) => {
        const userId = parseInt(req.headers[USER_ID_MIDDLEWARE_HEADER] as string);
        return { userId };
    }
});
