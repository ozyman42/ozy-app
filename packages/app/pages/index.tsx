import { CurPath } from '@/common/front-end/components/CurPath';
import { ErrorBoundary } from '@/common/front-end/components/ErrorBoundary';
import { useStore } from '@/common/front-end/state';
import { Navbar } from '@/common/front-end/components/Navbar'
import { Env, EnvToggle, reload, setEnvTo } from '@/common/front-end/components/EnvToggle';
import React, { useEffect } from 'react';

export default function Home() {
  const store = useStore(({navigation, curPage, loadFromLocal}) => ({navigation, curPage, loadFromLocal}));
  useEffect(() => {
    store.loadFromLocal();
  }, []);
  return <>
    <ErrorBoundary 
      main={() => 
        <div className='h-full flex flex-col'>
          <EnvToggle />
          <Navbar nav={store.navigation} path={[]} />
          <div className='flex-2 flex flex-col overflow-hidden'>
            <store.curPage.page />
          </div>
        </div>
      }
      fallback={() => <>
        <b>Encountered a failure!</b><br />
        <div className='btn btn-primary' onClick={async () => {
          await setEnvTo(Env.prod);
          reload("reloading since client side error was encountered");
        }}>
          Reload on prod
        </div>
      </>}
    />
    <pre className='absolute bottom-0'>
      <CurPath />
    </pre>
  </>
}
