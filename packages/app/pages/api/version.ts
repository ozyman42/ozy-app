import { NextApiRequest, NextApiResponse } from 'next';
import { APP_VERSION } from '@ozy/constants';

type Response = {
  version?: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Response>): Promise<void> {
  res.status(200).json({version: APP_VERSION});
}
