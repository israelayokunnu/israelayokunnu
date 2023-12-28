'use client';

import Image from 'next/image';
import AnimatedLogo from '@public/logo-animated.svg';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

const Menu = () => {
  const t = useTranslations('header.menu');

  return (
    <div className='rounded-lg flex flex-row items-center gap-10 bg-cyan-950 pl-8 pr-4 py-4'>
      <Image
        src={AnimatedLogo}
        alt='Israel Ayokunnu - animated logo'
        className='w-8'
      />

      <div className='flex flex-row font-semibold items-center text-white'>
        <Link href='#works' scroll className='hover:bg-cyan-900 p-4 rounded-lg'>
          {t('works')}
        </Link>
        <Link
          href='https://www.playground.israelayokunnu.com'
          target='_blank'
          className='hover:bg-cyan-900 p-4 rounded-lg'
        >
          {t('playground')}
        </Link>
      </div>
    </div>
  );
};

export default Menu;
