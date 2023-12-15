import { NextRequest, NextResponse } from 'next/server';
import { APP_VERSION } from '@ozy/constants';

export async function GET(req: NextRequest): Promise<NextResponse> {
  console.log("got a version req");
  return NextResponse.json({version: APP_VERSION});
}