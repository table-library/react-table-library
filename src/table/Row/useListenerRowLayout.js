import * as React from 'react';

import { ResizeContext } from '@table-library/react-table-library/common/context/Resize';

export const useListenerRowLayout = () => {
  // const { resizedLayout, layout, tableRef } = React.useContext(
  const { tableRef } = React.useContext(ResizeContext);

  const updateCells = React.useCallback(() => {
    // eslint-disable-next-line no-console
    console.log('update due to window');
  }, []);

  React.useEffect(() => {
    // if (layout?.listenToWindowResize) {
    window.addEventListener('resize', updateCells);
    // }

    return () => {
      // if (layout?.listenToWindowResize) {
      window.removeEventListener('resize', updateCells);
      // }
    };
  });

  const observer = React.useRef();

  React.useEffect(() => {
    observer.current = new ResizeObserver((entries) => {
      // eslint-disable-next-line no-console
      console.log(entries);
      // eslint-disable-next-line no-console
      console.log('update due to element');
    });

    observer.current.observe(tableRef.current);

    return () => observer.current.unobserve(tableRef.currenty);
  }, [tableRef, updateCells]);
};
