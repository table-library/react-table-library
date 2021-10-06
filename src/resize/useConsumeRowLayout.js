import * as React from 'react';

import { ResizeContext } from '@table-library/react-table-library/common/context/Resize';

// take all columns of this row
// and assign their width from the ref
// which has been produced in the header

export const useConsumeRowLayout = (ref, selector) => {
  const { layout, resizedLayout } = React.useContext(ResizeContext);

  React.useLayoutEffect(() => {
    const allCells = Array.from(
      ref.current.querySelectorAll(selector)
    );

    allCells.forEach((cell, index) => {
      cell.style.minWidth = `${resizedLayout.current[index]}px`;
      cell.style.maxWidth = `${resizedLayout.current[index]}px`;
    });
  }, [ref, layout, resizedLayout, selector]);
};
