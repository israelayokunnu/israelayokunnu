'use client';
import React, { useEffect, useState } from 'react';
import { quadtree } from 'd3-quadtree';

import { animated, useSpring } from 'react-spring';
import { TechStackItem } from '@app/services/stack/stack.interface';
import { TechStackList } from '@app/services/stack/stack.query';

export const SkillCanvas: React.FC = () => {
  // Initialize positions and velocities
  const initialTechItems = TechStackList.map((item) => ({
    ...item,
    x: Math.random() * 400 + 50, // Randomize initial position
    y: Math.random() * 400 + 50,
    vx: Math.random() * 2 - 1, // Random initial velocity
    vy: Math.random() * 2 - 1,
  }));

  const [techItems, setTechItems] = useState<TechStackItem[]>(initialTechItems);

  useEffect(() => {
    const tick = () => {
      setTechItems((currentItems) =>
        currentItems.map((item) => {
          // Update positions based on velocity
          let newX = item.x + item.vx;
          let newY = item.y + item.vy;

          // Boundary collision detection
          const boundarySize = 500;
          const itemSize = 100;
          if (newX <= 0 || newX + itemSize >= boundarySize) item.vx *= -1;
          if (newY <= 0 || newY + itemSize >= boundarySize) item.vy *= -1;

          // Return updated item
          return { ...item, x: newX, y: newY };
        })
      );
    };

    const intervalId = setInterval(tick, 50);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className='overflow-hidden relative flex justify-center w-full h-full'>
      {techItems.map((tech, index) => (
        <TechItem key={index} {...tech} />
      ))}
    </div>
  );
};

const TechItem: React.FC<TechStackItem> = ({
  icon: Icon,
  x,
  y,
  color,
  onClick,
}) => {
  return (
    <div
      className='rounded-2xl flex justify-center items-center text-white text-5xl font-extrabold'
      style={{
        backgroundColor: color,
        minHeight: 100,
        minWidth: 100,
        width: 'fit-content',
        height: 'fit-content',
        transform: `translate(${x}px, ${y}px)`,
        position: 'absolute',
      }}
      onClick={onClick}
    >
      <Icon />
    </div>
  );
};
