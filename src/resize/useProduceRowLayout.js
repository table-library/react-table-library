import * as React from 'react';

import { ResizeContext } from '@table-library/react-table-library/common/context/Resize';

// take all header columns
// read their width (whether it's % or px, it ends up as px)
// and write their width down into a ref to consume them in every row (and this header row)

export const useProduceRowLayout = (ref, selector) => {
  const { layout, resizedLayout } = React.useContext(ResizeContext);

  React.useLayoutEffect(() => {
    const allCells = Array.from(
      ref.current.querySelectorAll(selector)
    );

    const fixedCells = Array.from(
      ref.current.querySelectorAll(`${selector}.fixed`)
    );

    const fixedCellsWidth = fixedCells.reduce(
      (acc, element) => acc + element.getBoundingClientRect().width,
      0
    );

    const normalCells = Array.from(
      ref.current.querySelectorAll(`${selector}:not(.fixed)`)
    );

    resizedLayout.current = allCells.map((cell, index) => {
      // if it has been resized, take resize layout
      if (resizedLayout.current?.[index]) {
        return resizedLayout.current[index];
      }

      // if it is a fixed cell, fixed cell
      if (fixedCells.includes(cell)) {
        return `${cell.getBoundingClientRect().width}px`;
      }

      // if it is no custom layout, divide equally
      if (!layout?.custom) {
        const percentage = 100 / normalCells.length;
        const diff = fixedCellsWidth / normalCells.length;

        if (diff === 0) {
          return `${percentage}%`;
        }

        return `calc(${percentage}% - ${diff}px)`;
      }

      return null;
    });
  }, [layout, ref, resizedLayout, selector]);
};
