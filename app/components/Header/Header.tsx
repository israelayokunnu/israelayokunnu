import Image from 'next/image';
import Link from 'next/link';
import AnimatedLogo from '@public/logo-animated.svg';

const Header = () => {
  return (
    <div className='flex sticky top-0 justify-center items-center w-full'>
      <div className='font-extrabold leading-tight uppercase place-content-start flex-none grow text-xl'>
        <p>Israel</p>
        <p>Ayokunnu</p>
      </div>
      <div className='font-semibold leading-tight uppercase place-content-start flex-none text-right'>
        <Link href='/'>
          <Image
            src={AnimatedLogo}
            alt='Israel Ayokunnu - animated logo'
            className='w-6 lg:w-8'
          />
        </Link>
      </div>
    </div>
  );
};

export default Header;
