import * as React from 'react';

// we cannot hide with a CSS class,
// because we have to hide after all the resize operations
// to actually read the cell's width first and
// then hide it programmatically with JavaScript

export const useStyleHide = (cellRef, hide) => {
  const previousHide = React.useRef();

  React.useLayoutEffect(() => {
    if (previousHide.current === hide) return;

    if (hide) {
      cellRef.current.classList.add('hide');
    } else {
      cellRef.current.classList.remove('hide');
    }

    previousHide.current = hide;
  }, [cellRef, hide]);
};
