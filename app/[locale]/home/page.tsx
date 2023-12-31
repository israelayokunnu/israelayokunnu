import Header from '@app/components/Header/Header';

import PortalShapeCanvas from '@app/components/Landing/PortalShapeCanvas';
import Menu from '@app/components/Menu/Menu';
import SlideInAnimatedSeriesTexts from '@app/components/SlideInAnimatedSeriesTexts/SlideInAnimatedSeriesTexts';
import Contacts from '@app/components/contacts/Contacts';
import SocialLinks from '@app/components/socialLinks/SocialLinks';
import { useTranslations } from 'next-intl';
import React from 'react';

const Home = () => {
  const BOXES: Array<{}> = [];
  const t = useTranslations('home');

  return (
    <div className='w-full h-full text-cyan-950'>
      <div className='absolute w-screen h-screen top-0 -z-10 bg-ia-primary'>
        <PortalShapeCanvas />
      </div>
      <div className='z-10'>
        <div className='p-4 md:p-10 relative w-full'>
          <Header />
          <div className='text-cyan-950 mt-20'>
            <SlideInAnimatedSeriesTexts
              nodes={[
                <div className='font-bold text-lg'>{t('hero.text2')}</div>,
                <div className='font-normal text-md'>{t('hero.text3')}</div>,
              ]}
            />
            <b>—</b>
          </div>
        </div>

        <div className='fixed bottom-10 w-screen px-4 md:px-10'>
          <div className='flex justify-between items-center'>
            <SocialLinks />
            <Menu />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
