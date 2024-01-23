import { getByBit, setByBit } from './bybit';
import { modSteps } from './steps';
import { t } from './t';

export const appRouter = t.router({
    getByBit,
    setByBit,
    modSteps
});

export type AppRouter = typeof appRouter;
