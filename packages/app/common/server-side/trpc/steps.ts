import { t } from './t';
import { z } from 'zod';
import { schema, drizzle } from '@ozy/db-schema';
import { v4 as uuid } from 'uuid';
import { usingDb } from '../constants';

export enum ModStepsError {
    InvalidSteps = 'InvalidSteps',
    InvalidStartTime = 'InvalidStartTime',
    InvalidEndTime = 'InvalidEndTime',
    EndTimeBeforeStartTime = 'EndTimeBeforeStartTime',
    InternalServerError = 'InternalServerError'
}

export type ModStepsResponse = 
    { success: true; id: string; } |
    { success: false; error: ModStepsError; };

export const modSteps = t.procedure
    .input(z.object({
        stepCount: z.number(),
        startTime: z.string(),
        endTime: z.string(),
        id: z.string().nullish()
    }))
    .mutation(async ({ctx, input}): Promise<ModStepsResponse> => {
        const { stepCount, startTime, endTime, id } = input;
        const startDate = new Date(startTime);
        if (startDate.toString() === 'Invalid Date') {
            return {success: false, error: ModStepsError.InvalidStartTime};
        }
        const endDate = new Date(endTime);
        if (endDate.toString() === 'Invalid Date') {
            return {success: false, error: ModStepsError.InvalidEndTime};
        }
        if (endDate.getTime() < startDate.getTime()) {
            return {success: false, error: ModStepsError.EndTimeBeforeStartTime};
        }
        if (stepCount <= 0) {
            return {success: false, error: ModStepsError.InvalidSteps};
        }
        try {
            if (id) {
                const results = await usingDb(db => 
                  db.update(schema.steps)
                    .set({
                        startTime,
                        endTime,
                        steps: stepCount
                    })
                    .where(drizzle.and(
                        drizzle.eq(schema.steps.userId, ctx.userId),
                        drizzle.eq(schema.steps.id, id)
                    ))
                    .returning({ updatedId: schema.steps.id })
                );
                if (results.length !== 1) {
                    console.log('wrong update number of', results.length);
                    return {success: false, error: ModStepsError.InternalServerError};
                }
                const { updatedId } = results[0];
                if (updatedId !== id) {
                    console.log(`expected updated id of ${id} instead got ${updatedId}`);
                    return {success: false, error: ModStepsError.InternalServerError};
                }
                return {success: true, id};
            } else {
                const newId = uuid();
                await usingDb(db => db.insert(schema.steps)
                    .values({
                        id: newId,
                        userId: ctx.userId,
                        startTime,
                        endTime,
                        steps: stepCount
                    })
                    .execute());
                return {success: true, id: newId};
            }
        } catch(e) {
            const error = e as Error;
            console.log('failed to modify steps', input);
            console.log(error);
            return {success: false, error: ModStepsError.InternalServerError};
        }
    });

export const deleteSteps = t.procedure
    .input(z.object({
        id: z.string()
    }))
    .mutation(async ({ctx, input}) => {
        const result = await usingDb(db => db.delete(schema.steps)
            .where(drizzle.and(
                drizzle.eq(schema.steps.id, input.id),
                drizzle.eq(schema.steps.userId, ctx.userId)
            ))
            .returning({deletedStepsId: schema.steps.id}));
        if (result.length !== 1) {
            console.log('unexpectedly got the result length of', result.length);
            return {success: false};
        }
        const {deletedStepsId} = result[0];
        if (deletedStepsId !== input.id) {
            console.log(`unexpectedly got deleted result with id ${deletedStepsId} rather than id ${input.id}`);
            return {success: false};
        }
        return {success: true};
    });
