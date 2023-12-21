'use client';
import { usePathname, useSearchParams } from 'next/navigation';

export function CurPath() {
  const pathname = usePathname();
  const query = useSearchParams();
  const queryString = query.toString();

  return <>
    {pathname}{queryString ? `?${queryString}` : ''}
  </>
}