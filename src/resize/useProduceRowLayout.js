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

    const tableWidth = allCells.reduce(
      (sum, cell) => sum + cell.getBoundingClientRect().width,
      0
    );

    resizedLayout.current = allCells.map((cell) => {
      // if it is a shrink cell or custom layout, use extracted pixel
      if (shrinkCells.includes(cell) || layout?.custom) {
        return cell.getBoundingClientRect().width;
      }

      // else divide equally
      const offset = layout?.boxOffset || 0;
      const width = (tableWidth - offset) / normalCells.length;
      const diff = shrinkCellsWidth / normalCells.length;
      return width - diff;
    });
  }, [layout, ref, resizedLayout, selector]);
};
