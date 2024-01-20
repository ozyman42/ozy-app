import { httpBatchLink } from '@trpc/client';
import { createTRPCNext } from '@trpc/next';
import type { AppRouter } from '@/common/server-side/trpc';

function getBaseUrl() {
    if (typeof window !== 'undefined') {
        return '';
    }

    return `http://localhost:${process.env.PORT!}`;
}

export const trpc = createTRPCNext<AppRouter>({
    config() {
        return {
            links: [
                httpBatchLink({
                    url: getBaseUrl() + '/api/trpc'
                })
            ]
        }
    }
});
