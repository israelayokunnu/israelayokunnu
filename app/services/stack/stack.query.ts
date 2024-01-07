import { TechStackItem } from './stack.interface';
import {
  FaGithub,
  FaReact,
  FaAngular,
  FaNodeJs,
  FaPython,
  FaAws,
} from 'react-icons/fa';

export const TechStackList: TechStackItem[] = [
  {
    name: 'GitHub',
    icon: FaGithub,
    color: '#181717',
    onClick: () => window.open('https://github.com/easyadin', '_blank'),
  },
  {
    name: 'React',
    icon: FaReact,
    color: '#61DAFB',
    onClick: () => {},
  },
  {
    name: 'GitHub',
    icon: FaGithub,
    color: '#181717',
    onClick: () => window.open('https://github.com/easyadin', '_blank'),
  },
  {
    name: 'React',
    icon: FaReact,
    color: '#61DAFB',
    onClick: () => {},
  },
];
