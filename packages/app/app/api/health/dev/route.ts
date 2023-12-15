import { NextRequest, NextResponse } from 'next/server';
import { getDevServerStatus } from '../get-dev-status';

export async function GET(req: NextRequest): Promise<NextResponse> {
    return NextResponse.json(await getDevServerStatus());
}