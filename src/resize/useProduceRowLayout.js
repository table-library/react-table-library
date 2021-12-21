import * as React from 'react';

import { LayoutContext } from '@table-library/react-table-library/common/context/Layout';

// take all header columns
// read their width (whether it's % or px, it ends up as px)
// and write their width down into a ref to consume them in every row (and this header row)

export const useProduceRowLayout = (ref, selector) => {
  const { layout, tableMemoryRef } = React.useContext(LayoutContext);

  React.useLayoutEffect(() => {
    const allCells = Array.from(
      ref.current.querySelectorAll(selector)
    );

    const stiffCells = Array.from(
      ref.current.querySelectorAll(`${selector}.stiff`)
    );

    const stiffCellsWidth = stiffCells.reduce(
      (acc, element) => acc + element.getBoundingClientRect().width,
      0
    );

    const normalCells = Array.from(
      ref.current.querySelectorAll(`${selector}:not(.stiff)`)
    );

    tableMemoryRef.current.resizedLayout = allCells.map(
      (cell, index) => {
        // if it has been resized, take resize layout
        if (tableMemoryRef.current.resizedLayout?.[index]) {
          return tableMemoryRef.current.resizedLayout[index];
        }

        // if it is a stiff cell, stiff cell
        if (stiffCells.includes(cell)) {
          return `${cell.getBoundingClientRect().width}px`;
        }

        // if it is no custom layout, divide equally
        if (!layout?.custom) {
          const percentage = 100 / normalCells.length;

          const diff = stiffCellsWidth / normalCells.length;

          if (diff === 0) {
            return `${percentage}%`;
          }

          return `calc(${percentage}% - ${diff}px)`;
        }

        return null;
      }
    );
  }, [layout, ref, selector, tableMemoryRef]);
};
