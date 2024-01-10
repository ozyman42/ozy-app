import { CurPath } from '@/common/front-end/components/CurPath';
import { useStore } from '@/common/front-end/state';
import { Navbar } from '@/common/front-end/components/Navbar'
import { EnvToggle } from '@/common/front-end/components/EnvToggle';
import { useEffect } from 'react';

export default function Home() {
  const store = useStore(({navigation, curPage, loadFromLocal}) => ({navigation, curPage, loadFromLocal}));
  useEffect(() => {
    store.loadFromLocal();
  }, []);
  return <>
    <div>
      <EnvToggle />
      <Navbar nav={store.navigation} path={[]} />
      <store.curPage.page />
    </div>
    <pre className='absolute bottom-0'>
      <CurPath />
    </pre>
  </>
}
