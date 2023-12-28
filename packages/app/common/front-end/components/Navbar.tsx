import { Navigation, useStore } from '@/common/front-end/state';
import * as React from 'react';

export function Navbar({path, nav}: {path: string[], nav: Navigation}) {
  const {updateNav} = useStore(({updateNav}) => ({updateNav}));
  const curChild = nav.children[nav.curChild];
  const childPath = [...path, nav.curChild];
  return <>
    <div className='w-full'>
      <ul className="menu menu-xs menu-horizontal bg-base-200 w-full flex justify-between p-1">
        {Object.keys(nav.children).map((child) => {
          const isCurChild = child === nav.curChild;
          return <li key={child} onClick={() => {updateNav(path, child)}} className='flex-grow'>
            <a className={'text-center block mx-1 ' + (isCurChild ? 'active' : 'focus')}>{child}</a>
          </li>
        })}
      </ul>
    </div>
    {curChild && !curChild.isPage && <Navbar nav={curChild.navigation} path={childPath} key={childPath.join(".")} />}
  </>
}