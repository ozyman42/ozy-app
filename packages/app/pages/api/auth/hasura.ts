import { SESSION_ID_MIDDLEWARE_HEADER, USER_ID_MIDDLEWARE_HEADER } from '@ozy/constants';
import { NextApiRequest, NextApiResponse } from 'next';

type Response = {
    'X-Hasura-Role': string;
    'X-Hasura-User-Id': string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Response>): Promise<void> {
    console.log('hello world from hasura');
    console.log(req.headers[USER_ID_MIDDLEWARE_HEADER], req.headers[SESSION_ID_MIDDLEWARE_HEADER]);
    res.status(200).json({
        'X-Hasura-Role': 'readonly',
        'X-Hasura-User-Id': req.headers[USER_ID_MIDDLEWARE_HEADER] as string
    });
}
