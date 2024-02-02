import { SESSION_ID_MIDDLEWARE_HEADER, USER_ID_MIDDLEWARE_HEADER } from '@ozy/constants';
import { NextApiRequest, NextApiResponse } from 'next';

type Response = {
    sessionId: string;
    userId: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Response>): Promise<void> {
    const sessionId = req.headers[SESSION_ID_MIDDLEWARE_HEADER] as string;
    const userId = req.headers[USER_ID_MIDDLEWARE_HEADER] as string;
    res.status(200).json({sessionId, userId});
}
