import { NextApiRequest, NextApiResponse } from 'next';
import { APP_VERSION } from '@ozy/constants';
import { DevServerStatus, getDevServerStatus } from '@/common/server-side/get-dev-status';

type Response = {
  health: 'ok' | 'not ok';
  devServer?: DevServerStatus
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Response>): Promise<void> {
  console.log(`${APP_VERSION} health check`);
  if (APP_VERSION === 'prod') {
    const {text, code} = await getDevServerStatus();
    const fail = code === 200;
    console.log(`dev server ${code} response of ${text}; ${fail ? 'fail' : 'pass'} health check`);
    if (fail) {
      res.status(503).json({health: 'not ok', devServer: {text, code}});
    } else {
      res.status(200).json({health: 'ok', devServer: {text, code}});
    }
  } else {
    res.status(200).json({health: 'ok'});
  }
}