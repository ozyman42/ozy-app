import { createClient, generateSubscriptionOp } from '../gql';
import { createClient as createWsClient } from 'graphql-ws';
import { useState, useEffect } from 'react';

const wsClient = createWsClient({
    url: "/v1/graphql",
});

const genQL = createClient({
    url: '/v1/graphql'
});

export const gql = {
    mutate: genQL.mutation,
    query: genQL.query,
    subscribe: <T extends Parameters<typeof genQL.query>[0]> (req: T): Awaited<ReturnType<typeof genQL.query<T>>> | undefined => {
        const [result, setResult] = useState<Awaited<ReturnType<typeof genQL.query<T>>> | undefined>(undefined);
        useEffect(() => {
            console.log('setting up subscription');
            const { query, variables } = generateSubscriptionOp(req);
            wsClient.subscribe(
                { query, variables },
                {
                    next: (data) => {
                        console.log('subscription', data);
                        setResult(data as any);
                    },
                    error: (e: Error) => {
                        console.error('subscription error', e);
                    },
                    complete: () => {
                        console.log('finished subscription');
                    }
                }
            );
        }, []);
        return result;
    },
}