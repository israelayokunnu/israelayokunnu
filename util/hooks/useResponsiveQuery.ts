import { useState, useEffect } from 'react';

const useResponsiveQuery = (breakpoint: number): boolean => {
  const [isBelowBreakpoint, setIsBelowBreakpoint] = useState(
    window.innerWidth <= breakpoint
  );

  useEffect(() => {
    const handleResize = () => {
      setIsBelowBreakpoint(window.innerWidth <= breakpoint);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint]);

  return isBelowBreakpoint;
};

export default useResponsiveQuery;
