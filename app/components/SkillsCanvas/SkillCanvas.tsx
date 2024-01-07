'use client';
import React, { useEffect, useState } from 'react';
import { quadtree } from 'd3-quadtree';

import { TechStackItem } from '@app/services/stack/stack.interface';
import { TechStackList } from '@app/services/stack/stack.query';

export const SkillCanvas: React.FC = () => {
  // Function to calculate grid positions
  const calculateGridPosition = (index, gridWidth, itemSize) => {
    const x = (index % gridWidth) * itemSize + itemSize / 2;
    const y = Math.floor(index / gridWidth) * itemSize + itemSize / 2;
    return { x, y };
  };

  // Grid dimensions
  const gridWidth = Math.floor(500 / 100); // Adjust based on container and item sizes
  const itemSize = 100; // Size of each tech item

  const initialTechItems = TechStackList.map((item, index) => {
    // Get grid position
    const gridPosition = calculateGridPosition(index, gridWidth, itemSize);
    // Apply a small random offset
    const x = gridPosition.x + (Math.random() * 40 - 20);
    const y = gridPosition.y + (Math.random() * 40 - 20);

    return {
      ...item,
      x: Math.min(Math.max(x, 0), 500 - itemSize), // Ensure within boundary
      y: Math.min(Math.max(y, 0), 500 - itemSize),
      vx: Math.random() * 2 - 1,
      vy: Math.random() * 2 - 1,
    };
  });

  const [techItems, setTechItems] = useState<TechStackItem[]>(initialTechItems);

  useEffect(() => {
    const tick = () => {
      setTechItems((currentItems) => {
        return currentItems.map((item, index) => {
          let newX = item.x + item.vx;
          let newY = item.y + item.vy;
          const boundarySize = 500;
          const itemSize = 100;

          // Boundary collision detection
          if (newX <= 0 || newX + itemSize >= boundarySize) item.vx *= -1;
          if (newY <= 0 || newY + itemSize >= boundarySize) item.vy *= -1;

          // Overlap resolution with other items
          currentItems.forEach((otherItem, otherIndex) => {
            if (index !== otherIndex) {
              const dx = otherItem.x - newX;
              const dy = otherItem.y - newY;
              const distance = Math.sqrt(dx * dx + dy * dy);
              if (distance < itemSize) {
                // Simple overlap resolution
                item.vx *= -1;
                item.vy *= -1;
              }
            }
          });

          return { ...item, x: newX, y: newY };
        });
      });
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
