import * as React from 'react';

import { ResizeContext } from '@common/context/Resize';

export const useRowLayout = (ref, selector) => {
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
      if (resizedLayout.current?.[index]) {
        cell.style.width = resizedLayout.current[index];
      } else if (shrinkCells.includes(cell)) {
        cell.style.width = `${cell.getBoundingClientRect().width}px`;
      } else if (!layout?.custom) {
        const percentage = 100 / normalCells.length;
        const diff = shrinkCellsWidth / normalCells.length;

        cell.style.width = `calc(${percentage}% - ${diff}px)`;
      }
    });
  }, [ref, layout, resizedLayout, selector]);
};
