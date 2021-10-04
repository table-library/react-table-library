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

    const shrinkCellsWidth = shrinkCells.reduce(
      (acc, element) => acc + element.getBoundingClientRect().width,
      0
    );

    const normalCells = Array.from(
      ref.current.querySelectorAll(`${selector}:not(.shrink)`)
    );

    allCells.forEach((cell, index) => {
      // if it is a shrink cell, shrink cell
      if (shrinkCells.includes(cell)) {
        const value = `${cell.getBoundingClientRect().width}px`;
        resizedLayout.current[index] = value;
      }

      // if it is no custom layout, divide equally
      else if (!layout?.custom) {
        const percentage = 100 / normalCells.length;
        const diff = shrinkCellsWidth / normalCells.length;
        const value = `calc(${percentage}% - ${diff}px)`;
        resizedLayout.current[index] = value;
      }

      // if it has custom layout
      else {
        const value = `${cell.getBoundingClientRect().width}px`;
        resizedLayout.current[index] = value;
      }
    });
  }, [ref, layout, resizedLayout, selector]);
};
