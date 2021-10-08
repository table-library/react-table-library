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
    window.addEventListener('resize', updateCells);

    return () => {
      window.removeEventListener('resize', updateCells);
    };
  }, [layout?.responsive, updateCells]);

  const observer = React.useRef();

  const doObserve = React.useCallback(
    async (current) => {
      if ('ResizeObserver' in window === false) {
        // Loads polyfill asynchronously, only if required.
        const module = await import('@juggle/resize-observer');
        window.ResizeObserver = module.ResizeObserver;
      }

      observer.current = new ResizeObserver(updateCells);

      if (current) observer.current.observe(current);
    },
    [updateCells]
  );

  React.useLayoutEffect(() => {
    const { current } = tableRef;

    doObserve(current);

    return () => {
      if (observer.current && current) {
        observer.current.unobserve(current);
      }
    };
  }, [doObserve, layout, tableRef, updateCells]);
};
