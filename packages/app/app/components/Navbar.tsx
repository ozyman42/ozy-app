'use client';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TabsContent } from '@radix-ui/react-tabs';
import * as React from 'react';

export const navigation: Navigation = {
  Health: {
    Workouts: true,
    Steps: true,
    'Body Comp': true
  },
  Finance: {
    Trading: {
      Leverage: true,
      Bybit: true,
      TradingView: true
    },
    Taxes: true,
    Debt: true,
    Subscriptions: true
  },
  Social: {
    Contacts: true
  }
} as const;

interface Navigation {
  [k: string]: true | Navigation;
}

export function Navbar({vals, depth}: {vals: Navigation, depth: number}) {
  const valEntries = Object.entries(vals);
  const [curVal, setCurVal] = React.useState(valEntries[0][0]);
  const cur = vals[curVal];
  return <>
    <div className='w-full'>
      <Tabs value={curVal} className='w-full' onValueChange={v => {setCurVal(v);}}>
        <TabsList className={`w-full flex flex-row`}>
          {valEntries.map(([route, nav]) => <TabsTrigger value={route} key={route} className='flex flex-grow'>{route}</TabsTrigger>)}
        </TabsList>
        <TabsContent value=''></TabsContent>
      </Tabs>
    </div>
    {cur && cur !== true && <Navbar vals={cur} depth={depth + 1} key={curVal} />}
  </>
}