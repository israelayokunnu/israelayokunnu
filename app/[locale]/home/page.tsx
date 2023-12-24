import PortalShapeCanvas from '@app/components/Landing/PortalShapeCanvas';
import React from 'react';

const Home = () => {
  const BOXES: Array<{}> = [];

  return (
    <div className='overflow-hidden'>
      <div className='absolute w-screen h-screen top-0 -z-10 bg-ia-primary'>
        <PortalShapeCanvas />
      </div>
      Hello
    </div>
  );
};

export default Home;
