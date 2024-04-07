import { t } from './t';
import { z } from 'zod';

export const getByBit = t.procedure
    .query(async ({ input, ctx }) => {
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
        console.log('in mutation', ctx.userId, input.apiKey);
        return 'hello'
    });
