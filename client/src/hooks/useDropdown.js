import { useState, useRef, useEffect, useCallback } from 'react';

function useDropdown() {
  const [menuVisible, setMenuVisible] = useState(false);
  const handleTargetClick = () => {
    setMenuVisible((menuVisible) => !menuVisible);
  };

  const ref = useRef();

  const handleOtherClick = useCallback(
    (e) => {
      if (ref.current && ref.current.contains(e.target)) {
        return;
      }
      setMenuVisible(false);
    },
    [ref]
  );

  useEffect(() => {
    window.addEventListener('click', handleOtherClick);
    return () => {
      window.addEventListener('click', handleOtherClick);
    };
  }, [handleOtherClick]);

  return [menuVisible, ref, handleTargetClick];
}

export default useDropdown;
