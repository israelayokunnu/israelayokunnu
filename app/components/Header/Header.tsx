import Image from 'next/image';
import Link from 'next/link';
import AnimatedLogo from '@public/logo-animated.svg';
import ScrambleText from '../TextScramble/ScrambleText';

const Header = () => {
  return (
    <div className='flex sticky top-0 justify-center items-center w-full'>
      <div className='font-extrabold leading-tight uppercase place-content-start flex-none grow text-xl'>
        <ScrambleText
          text='Israel'
          scrambleChars='tbRv9NJ9NG'
          scrambleDuration={3000}
          startDelay={1000}
          animationSpeed={100}
        />
        <ScrambleText
          text='Ayokunnu'
          scrambleChars='i1GMhAaa5a'
          scrambleDuration={3000}
          startDelay={3000}
          animationSpeed={100}
        />
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
