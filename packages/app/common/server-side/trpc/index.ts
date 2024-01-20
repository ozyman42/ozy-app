import { getByBit, setByBit } from './bybit';
import { t } from './t';

export const appRouter = t.router({
    getByBit,
    setByBit
});

export type AppRouter = typeof appRouter;
