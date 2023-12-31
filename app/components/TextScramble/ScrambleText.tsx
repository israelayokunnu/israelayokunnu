'use client';
import React, { useEffect, useState } from 'react';

interface ScrambleTextProps {
  text: string;
  scrambleChars: string;
  scrambleDuration: number;
  startDelay: number;
  animationSpeed: number;
}

const ScrambleText: React.FC<ScrambleTextProps> = ({
  text,
  scrambleChars,
  scrambleDuration,
  startDelay,
  animationSpeed,
}) => {
  const [scrambledText, setScrambledText] = useState<string>('');

  useEffect(() => {
    const timer = setTimeout(() => {
      let currentText = text.split('').map(() => ' ');
      let frame = 0;
      const totalFrames = scrambleDuration / animationSpeed;

      const scramble = () => {
        if (frame >= totalFrames) {
          setScrambledText(text);
          return;
        }

        text.split('').forEach((char, index) => {
          if (Math.random() < 0.5 || frame === totalFrames - 1) {
            currentText[index] = char;
          } else {
            currentText[index] =
              scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
          }
        });

        setScrambledText(currentText.join(''));
        frame++;
        setTimeout(scramble, animationSpeed);
      };

      scramble();
    }, startDelay);

    return () => clearTimeout(timer);
  }, [text, scrambleChars, scrambleDuration, startDelay, animationSpeed]);

  return <div>{scrambledText}</div>;
};

export default ScrambleText;
