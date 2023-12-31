'use client';

import Image from 'next/image';
import AnimatedLogo from '@public/logo-animated.svg';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

const Menu = () => {
  const t = useTranslations('header.menu');

  return (
    <div className='rounded-xl flex flex-row items-center gap-4 bg-cyan-950 pl-8 pr-4 py-4'>
      <Link href='/'>
        <Image
          src={AnimatedLogo}
          alt='Israel Ayokunnu - animated logo'
          className='w-6 lg:w-8'
        />
      </Link>

      <div className='flex flex-row font-medium items-center text-white'>
        <Link href='#works' scroll className='hover:bg-cyan-900 p-4 rounded-lg'>
          {t('playground')}
        </Link>
      </div>
    </div>
  );
};

export default Menu;
