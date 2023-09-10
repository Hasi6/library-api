import { ExoticComponent, Suspense, SuspenseProps } from 'react';
import { RouteProps } from 'react-router-dom';

import Spinner from '@/components/atoms/Spinner';

const Loadable = (Component: ExoticComponent<SuspenseProps>) => (props: RouteProps) => {
  return (
    <Suspense
      fallback={
        <div className='flex h-screen'>
          <div className='m-auto'>
            <Spinner size={30} />
          </div>
        </div>
      }
    >
      <Component {...props} />
    </Suspense>
  );
};
export default Loadable;
