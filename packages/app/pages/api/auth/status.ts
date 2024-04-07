import { isAuthenticated } from '@/common/server-side/auth';
import { AuthStatusResponse } from '@/common/universal/api-interfaces';
import { AUTH_COOKIE_NAME } from '@ozy/constants';
import { NextApiRequest, NextApiResponse } from 'next';


export default async function handler(req: NextApiRequest, res: NextApiResponse<AuthStatusResponse>): Promise<void> {
    const { reqid } = req.headers;
    const authCookie = req.cookies[AUTH_COOKIE_NAME];
    const authStatusResult = await isAuthenticated(authCookie);
    res.status(200).json(authStatusResult);
}
