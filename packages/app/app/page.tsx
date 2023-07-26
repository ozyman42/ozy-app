'use client';
import * as React from 'react';
import { useStore } from '@/app/state';
import { Navbar } from './components/Navbar'

export default function Home() {
  const {navigation, curPage} = useStore(({navigation, curPage}) => ({navigation, curPage}));
  return <div>
    <Navbar nav={navigation} path={[]} />
    {JSON.stringify(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY)}
    <curPage.page />
  </div>
}