import AnimatedLogo from '@public/logo-animated-continous.svg';
import Image from 'next/image';

const Loading = () => {
  return (
    <div className='h-full w-full flex justify-center items-center z-10'>
      <Image
        src={AnimatedLogo}
        alt='Israel Ayokunnu - animated logo'
        className='w-16'
      />
    </div>
  );
};

export default Loading;
