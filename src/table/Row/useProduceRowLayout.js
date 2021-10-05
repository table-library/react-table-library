import * as React from 'react';

import { ResizeContext } from '@table-library/react-table-library/common/context/Resize';

// take all header columns
// read their width (whether it's % or px, it ends up as px)
// and write their width down into a ref to consume them in every row (and this header row)

export const useProduceRowLayout = (ref, selector) => {
  const { resizedLayout } = React.useContext(ResizeContext);

  React.useLayoutEffect(() => {
    const allCells = Array.from(
      ref.current.querySelectorAll(selector)
    );

    resizedLayout.current = allCells.map((cell) => {
      return `${cell.getBoundingClientRect().width}px`;
    });
  }, [ref, resizedLayout, selector]);
};
