import { initTRPC } from '@trpc/server';

export type Context = {
    userId: number;
}

export const t = initTRPC.context<Context>().create();
