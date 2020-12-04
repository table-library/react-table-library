import * as React from 'react';

import { ResizeContext } from '@context';

export const useRowLayout = (ref, selector, rowLayout) => {
  const { resizedLayout } = React.useContext(ResizeContext);

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
      } else if (rowLayout) {
        if (typeof rowLayout[index] === 'string') {
          cell.style.width = rowLayout[index];
        } else {
          cell.style[rowLayout[index].key] = rowLayout[index].value;
        }
      } else if (shrinkCells.includes(cell)) {
        cell.style.width = `${cell.getBoundingClientRect().width}px`;
      } else {
        const percentage = 100 / normalCells.length;
        const diff = shrinkCellsWidth / normalCells.length;

        cell.style.width = `calc(${percentage}% - ${diff}px)`;
      }
    });
  }, [ref, resizedLayout, rowLayout, selector]);
};
