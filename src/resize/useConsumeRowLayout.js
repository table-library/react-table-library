import * as React from 'react';

import { LayoutContext } from '@table-library/react-table-library/common/context/Layout';

// take all columns of this row
// and assign their width from the ref
// which has been produced in the header

export const useConsumeRowLayout = (ref, selector) => {
  const { layout, tableMemoryRef } = React.useContext(LayoutContext);

  const calledOnce = React.useRef();

  React.useLayoutEffect(() => {
    if (calledOnce.current) return;
    calledOnce.current = true;

    const allCells = Array.from(
      ref.current.querySelectorAll(selector)
    );

    allCells.forEach((cell, index) => {
      if (tableMemoryRef.current.resizedLayout[index] === null)
        return;

      cell.style.width = tableMemoryRef.current.resizedLayout[index];
      cell.style.minWidth =
        tableMemoryRef.current.resizedLayout[index];
    });
  }, [ref, layout, selector, tableMemoryRef]);
};
