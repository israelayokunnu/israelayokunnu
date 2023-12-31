import React from 'react';
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaStackOverflow,
  FaGlobe,
} from 'react-icons/fa';

interface SocialLink {
  name: string;
  url: string;
  iconName: string;
}

const SocialLinks: React.FC = () => {
  const socialLinks: SocialLink[] = [
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/easyadin/',
      iconName: 'linkedin',
    },
    {
      name: 'GitHub',
      url: 'https://github.com/easyadin',
      iconName: 'github',
    },
  ];

  return (
    <div className='flex flex-row gap-4'>
      {socialLinks.map((link) => (
        <a
          key={link.name}
          href={link.url}
          target='_blank'
          rel='noopener noreferrer'
        >
          <span className='text-light lowercase'>{link.name}</span>
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
