import * as React from 'react';

import { LayoutContext } from '@table-library/react-table-library/common/context/Layout';

import { TableElementRef } from '@table-library/react-table-library/types/layout';

// take all columns of this row
// and assign their width from the ref
// which has been produced in the header

export const useConsumeRowLayout = (ref: TableElementRef, selector: string) => {
  const context = React.useContext(LayoutContext);

  if (!context) {
    throw new Error('No Layout Context.');
  }

  const { tableMemoryRef, layout } = context;

  const calledOnce = React.useRef(false);

  React.useLayoutEffect(() => {
    if (calledOnce.current) return;
    calledOnce.current = true;

    const allCells = Array.from(ref.current!.querySelectorAll(selector)) as HTMLElement[];

    allCells.forEach((cell, index) => {
      if (tableMemoryRef.current!.resizedLayout[index] === null) return;

      cell.setAttribute(
        'style',
        `width: ${tableMemoryRef.current!.resizedLayout[index]}; min-width: ${
          tableMemoryRef.current!.resizedLayout[index]
        };`,
      );
    });
  }, [ref, layout, selector, tableMemoryRef]);
};
