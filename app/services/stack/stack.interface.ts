import { IconType } from 'react-icons';

export interface TechStackItem {
  name: string;
  icon: IconType;
  color: string;
  onClick: () => void;
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
}
