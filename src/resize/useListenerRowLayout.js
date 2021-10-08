import * as React from 'react';

import { ResizeContext } from '@table-library/react-table-library/common/context/Resize';

import {
  getHeaderColumns,
  applyToHeaderColumns,
  applyToColumns,
} from './util';

export const useListenerRowLayout = () => {
  const { tableRef, layout, resizedLayout } = React.useContext(
    ResizeContext
  );

  const updateCells = React.useCallback(() => {
    if (!tableRef.current) return;

    const tableWidth = tableRef.current.getBoundingClientRect().width;
    const allCellWidths = getHeaderColumns(tableRef).reduce(
      (s, v) => s + v.getBoundingClientRect().width,
      0
    );

    const headerRow = tableRef.current.querySelector('.tr-header');

    const shrinkCells = Array.from(
      headerRow.querySelectorAll(`.th.shrink`)
    );

    const shrinkCellsWidth = shrinkCells.reduce(
      (acc, element) => acc + element.getBoundingClientRect().width,
      0
    );

    const offset = layout?.boxOffset || 0;

    const percentage =
      (tableWidth - offset - shrinkCellsWidth) /
      (allCellWidths - shrinkCellsWidth);

    const newColumnWidths = getHeaderColumns(tableRef).map((cell) => {
      if (shrinkCells.includes(cell)) {
        return cell.getBoundingClientRect().width;
      }

      return cell.getBoundingClientRect().width * percentage;
    });

    const applyWidth = (cell, i) => {
      cell.style.minWidth = `${newColumnWidths[i]}px`;
      cell.style.maxWidth = `${newColumnWidths[i]}px`;
    };

    applyToHeaderColumns(tableRef, applyWidth);
    applyToColumns(tableRef, applyWidth);

    resizedLayout.current = newColumnWidths;
  }, [layout?.boxOffset, resizedLayout, tableRef]);

  React.useLayoutEffect(() => {
    if (!('ResizeObserver' in window)) {
      window.addEventListener('resize', updateCells);
    }

    return () => {
      if (!('ResizeObserver' in window)) {
        window.removeEventListener('resize', updateCells);
      }
    };
  }, [layout?.responsive, updateCells]);

  const observer = React.useRef();

  React.useLayoutEffect(() => {
    const { current } = tableRef;
    if ('ResizeObserver' in window && current) {
      observer.current = new ResizeObserver(updateCells);
      observer.current.observe(current);
    }

    return () => {
      if ('ResizeObserver' in window && current) {
        observer.current.unobserve(current);
      }
    };
  }, [layout?.responsive, tableRef, updateCells]);
};
