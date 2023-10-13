import { useState, useEffect, RefObject } from 'react';

export function useButtonPress(buttonRef: RefObject<HTMLButtonElement | HTMLAnchorElement>) {
  const [buttonPressed, setButtonPressed] = useState(false);

  useEffect(() => {
    const handleButtonClick = () => {
      setButtonPressed(true);
    };

    if (buttonRef.current) {
      buttonRef.current.addEventListener('click', handleButtonClick);
    }

    return () => {
      if (buttonRef.current) {
        buttonRef.current.removeEventListener('click', handleButtonClick);
      }
    };
  }, [buttonRef]);

  return buttonPressed;
}
