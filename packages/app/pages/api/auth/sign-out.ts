import { AUTH_COOKIE_NAME, EXPIRE_AUTH_COOKIE_HEADER } from '@ozy/constants';
import { usingDb } from '../../../common/server-side/constants';
import { NextApiRequest, NextApiResponse } from 'next';
import { schema, drizzle } from '@ozy/db-schema';

enum SignOutError {
    FailedToDeleteSession = 'FailedToDeleteSession'
}

type SignOutResponse = 
    {success: true} |
    {success: false; error: SignOutError};

export default async function handler(req: NextApiRequest, res: NextApiResponse<SignOutResponse>): Promise<void> {
    const cookie = req.cookies[AUTH_COOKIE_NAME];
    res.setHeader('Set-Cookie', EXPIRE_AUTH_COOKIE_HEADER);
    const sessionId = req.headers.sessionid as string;
    const result = await usingDb(db => db.delete(schema.sessions)
        .where(drizzle.eq(schema.sessions.id, sessionId))
        .returning({ deletedSessionId: schema.sessions.id }));
    res.status(200).json({success: true});
}
