import { NextRequest, NextResponse } from 'next/server';
import { DB_USER_PASSWORD, DB_USER_NAME } from '@ozy/constants';

export async function POST(req: NextRequest): Promise<NextResponse> {
  console.log('hello world2');
  return NextResponse.json({hello: 'world'});
}