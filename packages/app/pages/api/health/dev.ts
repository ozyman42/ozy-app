import { NextApiRequest, NextApiResponse } from 'next';
import { DevServerStatus, getDevServerStatus } from '@/common/server-side/get-dev-status';

export default async function handler(req: NextApiRequest, res: NextApiResponse<DevServerStatus>): Promise<void> {
    res.status(200).json(await getDevServerStatus());
}