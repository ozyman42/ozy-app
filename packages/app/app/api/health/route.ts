import { NextRequest, NextResponse } from 'next/server';
import { APP_VERSION } from '@ozy/constants';
import { getDevServerStatus } from './get-dev-status';

export async function GET(req: NextRequest): Promise<NextResponse> {
  if (APP_VERSION === 'prod') {
    const {text, code} = await getDevServerStatus();
    const fail = code === 200;
    console.log(`dev server ${code} response of ${text}; ${fail ? 'fail' : 'pass'} health check`);
    if (fail) {
      return NextResponse.json({health: 'not ok', devServer: {text, code}}, {status: 503});
    }
    return NextResponse.json({health: 'ok', devServer: {text, code}});
  }
  return NextResponse.json({health: 'ok'});
}