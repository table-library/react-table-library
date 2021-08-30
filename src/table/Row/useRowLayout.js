import * as React from 'react';

import { ResizeContext } from '@table-library/react-table-library/common/context/Resize';

export const useRowLayout = (ref, selector) => {
  const { layout, resizedLayout } = React.useContext(ResizeContext);

  React.useLayoutEffect(() => {
    if (layout?.custom) return;

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
      // if it has been resized, take resize layout
      if (resizedLayout.current?.[index]) {
        cell.style.width = resizedLayout.current[index];
      }
      // if it is a shrink cell, shrink cell
      else if (shrinkCells.includes(cell)) {
        cell.style.width = `${cell.getBoundingClientRect().width}px`;
      }
      // if it is no custom layout, divide equally
      else {
        const percentage = 100 / normalCells.length;
        const diff = shrinkCellsWidth / normalCells.length;

        cell.style.width = `calc(${percentage}% - ${diff}px)`;
      }
    });
  }, [ref, layout, resizedLayout, selector]);
};
