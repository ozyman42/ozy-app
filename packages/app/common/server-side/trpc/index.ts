import { getByBit, setByBit } from './bybit';
import { modSteps, deleteSteps } from './steps';
import { t } from './t';

export const appRouter = t.router({
    getByBit,
    setByBit,
    modSteps,
    deleteSteps
});

export type AppRouter = typeof appRouter;
