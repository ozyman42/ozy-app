import { NextApiRequest, NextApiResponse } from 'next';
import { LoginResponse, LoginError } from '@/common/universal/api-interfaces';
import { createAuthCookie } from '@/common/server-side/auth';
import { AUTH_COOKIE_NAME } from '@ozy/constants';

export default async function handler(req: NextApiRequest, res: NextApiResponse<LoginResponse>): Promise<void> {
    if (req.method !== 'POST') {
        res.status(405).send({success: false, error: LoginError.NotPost});
        return;
    }
    const result = await createAuthCookie(JSON.parse(req.body));
    if (!result.success) {
        res.status(200).send(result);
        return;
    }
    res.setHeader('Set-Cookie', `${AUTH_COOKIE_NAME}=${result.cookie}; Path=/`);
    res.status(200).json({success: true});
}
