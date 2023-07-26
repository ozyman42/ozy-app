'use client'
import * as React from 'react';
import { usePathname } from 'next/navigation';

export default function NotFoundPage() {
  const pathname = usePathname();
  return <>
    Route {pathname} is not found
  </>
}