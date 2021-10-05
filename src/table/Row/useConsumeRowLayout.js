import * as React from 'react';

import { ResizeContext } from '@table-library/react-table-library/common/context/Resize';

export const useConsumeRowLayout = (ref, selector) => {
  const { layout, resizedLayout } = React.useContext(ResizeContext);

  React.useLayoutEffect(() => {
    const allCells = Array.from(
      ref.current.querySelectorAll(selector)
    );

    allCells.forEach((cell, index) => {
      if (index === allCells.length - 1) {
        cell.style.maxWidth = resizedLayout.current[index];
      } else {
        cell.style.minWidth = resizedLayout.current[index];
        cell.style.maxWidth = resizedLayout.current[index];
      }
    });
  }, [ref, layout, resizedLayout, selector]);
};
