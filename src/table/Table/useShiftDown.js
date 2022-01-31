import * as React from 'react';

export const useShiftDown = () => {
  const [isShiftDown, setShiftDown] = React.useState(false);

  React.useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.shiftKey) {
        setShiftDown(true);
      } else if (isShiftDown) {
        setShiftDown(false);
      }
    };

    const handleKeyUp = () => {
      if (isShiftDown) {
        setShiftDown(false);
      }
    };

    if (document) {
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('keyup', handleKeyUp);
    }

    return () => {
      if (document) {
        document.removeEventListener('keydown', handleKeyDown);
        document.removeEventListener('keyup', handleKeyUp);
      }
    };
  }, [isShiftDown]);

  return isShiftDown;
};
