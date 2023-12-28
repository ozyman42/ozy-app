import { NextApiRequest, NextApiResponse } from 'next';
import { APP_VERSION } from '@ozy/constants';

type Response = {
  version?: string;
}

export const VERSION_RESPONSE = {version: APP_VERSION};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Response>): Promise<void> {
  res.status(200).json(VERSION_RESPONSE);
}
