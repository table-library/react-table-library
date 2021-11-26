import * as React from 'react';

import { ResizeContext } from '@table-library/react-table-library/common/context/Resize';

// take all columns of this row
// and assign their width from the ref
// which has been produced in the header

export const useConsumeRowLayout = (ref, selector) => {
  const { layout, resizedLayout } = React.useContext(ResizeContext);

  const calledOnce = React.useRef();

  React.useLayoutEffect(() => {
    if (calledOnce.current) return;
    calledOnce.current = true;

    const allCells = Array.from(
      ref.current.querySelectorAll(selector)
    );

    allCells.forEach((cell, index) => {
      if (resizedLayout.current[index] === null) return;

      cell.style.width = `${resizedLayout.current[index]}px`;
    });
  }, [ref, layout, resizedLayout, selector]);
};
