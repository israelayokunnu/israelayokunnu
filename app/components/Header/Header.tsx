'use client';
import Image from 'next/image';
import Link from 'next/link';
import AnimatedLogo from '@public/logo-animated.svg';
import ScrambleText from '../TextScramble/ScrambleText';
import { useTranslations } from 'next-intl';
import SlideInAnimatedSeriesTexts from '../SlideInAnimatedSeriesTexts/SlideInAnimatedSeriesTexts';

const Header = () => {
  const t = useTranslations('header.menu');

  return (
    <div className='sticky top-0'>
      <div className='flex justify-center lg:items-center w-full'>
        <div
          className='uppercase'
          style={{
            fontFamily: "'Antonio', sans-serif",
            flex: '1 1 0%',
            height: 30,
            fontSize: 30,
            fontWeight: '700',
            lineHeight: '30px',
            color: 'black',
            letterSpacing: -2,
          }}
        >
          <ScrambleText
            text='Israel'
            scrambleChars='tbRv9NJ9NG'
            scrambleDuration={3000}
            startDelay={0}
            animationSpeed={100}
          />
          <ScrambleText
            text='Ayokunnu'
            scrambleChars='i1GMhAaa5a'
            scrambleDuration={3000}
            startDelay={1000}
            animationSpeed={100}
          />
        </div>
        <div className='flex md:flex-row flex-col-reverse items-end justify-end text-right gap-4 md:gap-16 lg:items-center'>
          <Link href='#works' scroll className='mt-12 md:mt-0'>
            <SlideInAnimatedSeriesTexts
              nodes={[
                <p className='uppercase text-sm text-cyan-900 font-semibold'>
                  {t('playground')}
                </p>,
                <p className='text-xs' style={{ maxWidth: 150 }}>
                  {t('playground_short_description')}
                </p>,
              ]}
            />
          </Link>

          <Link href='/'>
            <Image
              src={AnimatedLogo}
              alt='Israel Ayokunnu - animated logo'
              className='w-6 lg:w-8'
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
