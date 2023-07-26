'use client';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Navigation, useStore } from '@/app/state';
import * as React from 'react';

export function Navbar({path, nav}: {path: string[], nav: Navigation}) {
  const {updateNav} = useStore(({updateNav}) => ({updateNav}));
  const curChild = nav.children[nav.curChild];
  const childPath = [...path, nav.curChild];
  return <>
    <div className='w-full'>
      <Tabs value={nav.curChild} className='w-full' onValueChange={v => {updateNav(path, v)}}>
        <TabsList className={`w-full flex flex-row rounded-none`}>
          {Object.keys(nav.children).map((child) => <TabsTrigger value={child} key={child} className='flex flex-grow'>{child}</TabsTrigger>)}
        </TabsList>
      </Tabs>
    </div>
    {curChild && !curChild.isPage && <Navbar nav={curChild.navigation} path={childPath} key={childPath.join(".")} />}
  </>
}