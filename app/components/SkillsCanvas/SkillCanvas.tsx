'use client';
import React, { useEffect, useState } from 'react';
import {
  forceSimulation,
  forceManyBody,
  forceCenter,
  forceCollide,
} from 'd3-force';

import { animated, useSpring } from 'react-spring';
import { TechStackItem } from '@app/services/stack/stack.interface';
import { TechStackList } from '@app/services/stack/stack.query';

export const SkillCanvas: React.FC = () => {
  const [techItems, setTechItems] = useState<TechStackItem[]>(
    TechStackList.map((item) => ({
      ...item,
      x: 300 + Math.random() * 50 - 25,
      y: 300 + Math.random() * 50 - 25,
      vx: Math.random() * 2 - 1, // Random initial velocity
      vy: Math.random() * 2 - 1,
    }))
  );

  useEffect(() => {
    const simulation: any = forceSimulation(techItems)
      .force('charge', forceManyBody().strength(-30))
      .force('center', forceCenter(300, 300))
      .force('collision', forceCollide(50))
      .on('tick', () => setTechItems([...simulation.nodes()]));

    // Additional effect to start random movement after simulation
    const timeout = setTimeout(() => {
      const newTechItems = techItems.map((item) => ({
        ...item,
        vx: Math.random() * 2 - 1, // Update velocity for random movement
        vy: Math.random() * 2 - 1,
      }));
      setTechItems(newTechItems);
    }, 1000);

    return () => {
      simulation.stop();
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className='relative flex justify-center w-full h-full'>
      {techItems.map((tech, index) => (
        <TechItem key={index} {...tech} />
      ))}
    </div>
  );
};

const TechItem: React.FC<TechStackItem> = ({ icon: Icon, ...tech }) => {
  const [props, set] = useSpring(() => ({
    xy: [tech.x || 0, tech.y || 0],
    config: { mass: 10, tension: 550, friction: 140 },
  }));

  useEffect(() => {
    set({ xy: [tech.x || 0, tech.y || 0] });
  }, [tech.x, tech.y]);

  // Function to check if two items are overlapping
  const areOverlapping = (item1, item2) => {
    const size = 100; // Assuming each item is 100x100
    return (
      Math.abs(item1.x - item2.x) < size && Math.abs(item1.y - item2.y) < size
    );
  };

  useEffect(() => {
    const move = () => {
      // Calculate new position
      let newX = tech.x + tech.vx;
      let newY = tech.y + tech.vy;

      // Adjust the boundary collision detection
      const boundarySize = 500;
      const itemSize = 100; // Adjust if your item size is different
      if (newX <= 0 || newX + itemSize >= boundarySize) {
        tech.vx *= -1;
        newX = tech.x; // Revert to previous position on collision
      }
      if (newY <= 0 || newY + itemSize >= boundarySize) {
        tech.vy *= -1;
        newY = tech.y; // Revert to previous position on collision
      }

      // Check for collisions with other tech items
      TechStackList.forEach((otherTech) => {
        if (otherTech.name !== tech.name && areOverlapping(tech, otherTech)) {
          tech.vx *= -1;
          tech.vy *= -1;
        }
      });

      // Update position
      set({ xy: [newX, newY] });
      tech.x = newX;
      tech.y = newY;
    };

    const intervalId = setInterval(move, 50);

    return () => clearInterval(intervalId);
  }, [tech, set]);

  return (
    <animated.div
      className='rounded-2xl flex justify-center items-center text-white text-5xl font-extrabold'
      style={{
        backgroundColor: tech.color,
        minHeight: 100,
        minWidth: 100,
        width: 'fit-content',
        height: 'fit-content',
        transform: props.xy.interpolate((x, y) => `translate(${x}px,${y}px)`),
        position: 'absolute',
      }}
      onClick={tech.onClick}
    >
      <Icon />
    </animated.div>
  );
};
