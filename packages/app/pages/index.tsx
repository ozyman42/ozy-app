import { CurPath } from '@/common/front-end/components/CurPath';
import { useStore } from '@/common/front-end/state';
import { Navbar } from '@/common/front-end/components/Navbar'
import { EnvToggle } from '@/common/front-end/components/EnvToggle';

export default function Home() {
  const {navigation, curPage} = useStore(({navigation, curPage}) => ({navigation, curPage}));
  return <>
    <div>
      <EnvToggle />
      <Navbar nav={navigation} path={[]} />
      <curPage.page />
    </div>
    <pre className='absolute bottom-0'>
      <CurPath />
    </pre>
  </>
}
