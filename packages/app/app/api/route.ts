import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest): Promise<NextResponse> {
  console.log('hello world post');
  return NextResponse.json({hello: 'world'});
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  console.log("hello world get");
  return NextResponse.json({hello: 'goodbye'});
}