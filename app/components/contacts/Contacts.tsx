import React from 'react';

interface SocialLink {
  value: string;
  protocol: string;
}

const Contacts: React.FC = () => {
  const contactOptions: SocialLink[] = [
    {
      value: 'tobiayokunnu@gmail.com',
      protocol: 'mailto',
    },
    // {
    //   value: '+971509730664',
    //   protocol: 'tel',
    // },
  ];

  return (
    <div>
      <div className='text-sm font-extrabold flex flex-col gap-4 '>
        <SplitText text='SAY' />
        <SplitText text='HELLO' />
      </div>
    </div>
  );
};

const SplitText = ({ text }: { text: string }) => {
  return (
    <div className='flex flex-col'>
      {text.split('').map((char, i) => (
        <p className='-mb-1'>{char}</p>
      ))}
    </div>
  );
};

export default Contacts;
