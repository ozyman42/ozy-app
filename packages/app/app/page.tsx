'use client';
import * as React from 'react';
import { useStore } from '@/app/state';
import { Navbar } from './components/Navbar'

export default function Home() {
  const {navigation, curPage} = useStore(({navigation, curPage}) => ({navigation, curPage}));
  return <>
    <Navbar nav={navigation} path={[]} />
    <curPage.page />
  </>
}
