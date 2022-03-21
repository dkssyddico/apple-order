import { useEffect, useState } from 'react';

function useWidthCheck() {
  const [width, setWidth] = useState(undefined);
  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });
  return width;
}

export default useWidthCheck;
