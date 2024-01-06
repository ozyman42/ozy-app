import { NextApiRequest, NextApiResponse } from 'next';

type Response = {
    sessionId: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Response>): Promise<void> {
    const sessionId = req.headers.sessionid as string;
    res.status(200).json({sessionId});
}