import * as React from 'react';

import { ResizeContext } from '@table-library/react-table-library/common/context/Resize';

export const useProduceRowLayout = (ref, selector) => {
  const { layout, resizedLayout } = React.useContext(ResizeContext);

  React.useLayoutEffect(() => {
    const allCells = Array.from(
      ref.current.querySelectorAll(selector)
    );

    const shrinkCells = Array.from(
      ref.current.querySelectorAll(`${selector}.shrink`)
    );

    allCells.forEach((cell, index) => {
      // if it is a shrink cell, shrink cell
      if (shrinkCells.includes(cell)) {
        const value = `${cell.getBoundingClientRect().width}px`;
        resizedLayout.current[index] = value;
      } else {
        const value = `${cell.getBoundingClientRect().width}px`;
        resizedLayout.current[index] = value;
      }
    });
  }, [ref, layout, resizedLayout, selector]);
};
