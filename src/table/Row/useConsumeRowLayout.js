import * as React from 'react';

import { ResizeContext } from '@table-library/react-table-library/common/context/Resize';

export const useConsumeRowLayout = (ref, selector) => {
  const { layout, resizedLayout } = React.useContext(ResizeContext);

  React.useLayoutEffect(() => {
    const allCells = Array.from(
      ref.current.querySelectorAll(selector)
    );

    allCells.forEach((cell, index) => {
      cell.style.width = resizedLayout.current[index];
    });
  }, [ref, layout, resizedLayout, selector]);
};
