import { t } from './t';
import { z } from 'zod';
import { decrypt, encrypt } from '@/common/server-side/auth';
import { dbPromise, schema, drizzle } from '@ozy/db-schema';

export const getByBit = t.procedure
    .query(async ({ input, ctx }) => {
        const db = await dbPromise;
        console.log('in query', ctx.userId);
        return {
            text: `rawr`
        }
    });

export const setByBit = t.procedure
    .input(z.object({
        apiKey: z.string()
    }))
    .mutation(async ({ input, ctx }) => {
        const db = await dbPromise;
        console.log('in mutation', ctx.userId, input.apiKey);
        return 'hello'
    });
