import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  //console.log('Middleware executed', request.url);
  return NextResponse.next();
}