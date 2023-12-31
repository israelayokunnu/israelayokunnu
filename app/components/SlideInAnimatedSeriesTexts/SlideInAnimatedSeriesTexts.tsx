import { ReactNode } from 'react';
import './SlideInAnimatedSeriesTexts.css';
import React from 'react';

type Props = {
  nodes: ReactNode[];
};

const SlideInAnimatedSeriesTexts: React.FC<Props> = ({ nodes }) => {
  return (
    <div className='animated overflow-hidden'>
      <div className='text-top'>
        <div>
          {nodes.map((text, index) =>
            React.cloneElement(text as React.ReactElement, {
              key: index,
              style: {
                animation: `showTopText 1s forwards`,
                animationDelay: `${0.5 * index}s`,
              },
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default SlideInAnimatedSeriesTexts;
