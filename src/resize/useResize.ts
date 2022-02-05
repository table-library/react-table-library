import * as React from 'react';

import { LayoutContext } from '@table-library/react-table-library/common/context/Layout';
import {
  getHeaderColumns,
  applyToHeaderColumns,
  applyToColumns,
} from '@table-library/react-table-library/common/util/columns';

import { Nullish } from '@table-library/react-table-library/types/common';
import { TableElementRef, Layout } from '@table-library/react-table-library/types/layout';

type DataColumn = {
  index: number;
  minResizeWidth: number;
  width: number;
  isStiff: boolean;
};

const applyResize = (
  index: number,
  tableElementRef: TableElementRef,
  layout: Layout,
  resizeWidth: number,
) => {
  const headerColumns = getHeaderColumns(tableElementRef);

  const columns = headerColumns.map((headerCell, j) => ({
    index: j,
    minResizeWidth: +headerCell.getAttribute('data-resize-min-width')!, // should not be null, because defined with fallback on Cell
    width: headerCell.getBoundingClientRect().width,
    isStiff: headerCell.classList.contains('stiff'),
  }));

  const afterColumn = columns.reduce((acc: DataColumn | Nullish, value: DataColumn, j: number) => {
    if (acc) return acc;
    if (j > index && value.width !== 0) return value;

    return acc;
  }, null);

  const thead = tableElementRef.current!.querySelector('.thead');
  const tableWidth = thead?.getBoundingClientRect().width || 0;

  const { minResizeWidth } = columns[index];

  const actualResizeWidth = resizeWidth > minResizeWidth ? resizeWidth : minResizeWidth;

  const diffWidth = actualResizeWidth - columns[index].width;

  // calculate new widths of cell under consideration of its neighbors

  const newColumnWidthsAsPx = columns.map((column, i) => {
    if (afterColumn && index === i) {
      const nextWidth = afterColumn.width - diffWidth;
      const willNextAdjust = nextWidth > minResizeWidth;

      return willNextAdjust ? actualResizeWidth : column.width;
    }

    if (afterColumn?.index === i) {
      const nextWidth = column.width - diffWidth;
      const shouldAdjust = nextWidth > minResizeWidth;

      return shouldAdjust ? nextWidth : column.width;
    }

    return column.width;
  });

  const newColumnWidths = columns.map((column, i) => {
    const px = newColumnWidthsAsPx[i];
    const percentage = (px / tableWidth) * 100;

    // if horizontalScroll, then we cannot work with "absolute" percentages
    // TODO maybe there is a way to keep % for horizontalScroll, however, use with resize feature I didn't find one yet
    return column.isStiff || layout?.horizontalScroll ? `${px}px` : `${percentage}%`;
  });

  // imperative write of all cell widths

  const applyWidth = (cell: HTMLElement, i: number) => {
    cell.style.width = newColumnWidths[i];
    cell.style.minWidth = newColumnWidths[i];
  };

  // pin feature as edge case

  const applyLeft = (cell: HTMLElement, i: number) => {
    if ([...Array.from(cell.classList)].includes('pin')) {
      const left = newColumnWidthsAsPx.reduce((sum, v, j) => {
        if (j >= i) return sum;
        return sum + v;
      }, 0);

      cell.style.left = `${left}px`;
    }
  };

  applyToHeaderColumns(tableElementRef, applyWidth);
  applyToColumns(tableElementRef, applyWidth);

  applyToHeaderColumns(tableElementRef, applyLeft);
  applyToColumns(tableElementRef, applyLeft);

  return newColumnWidths;
};

export const useResize = (cellRef: React.RefObject<HTMLDivElement>, index: number) => {
  const context = React.useContext(LayoutContext);

  if (!context) {
    throw new Error('No Layout Context.');
  }

  const { tableMemoryRef, tableElementRef, layout } = context;

  const resizeRef = React.useRef<HTMLSpanElement>(null);

  const startOffset = React.useRef<number | null>(null);
  const isMouseDown = React.useRef<boolean>(false);

  const onMouseDown = React.useCallback(
    (event) => {
      event.preventDefault();

      isMouseDown.current = true;
      startOffset.current = cellRef.current!.offsetWidth - event.pageX;
    },
    [cellRef],
  );

  const onMouseMove = React.useCallback(
    (event) => {
      if (isMouseDown.current) {
        event.preventDefault();

        const resizeWidth = startOffset.current + event.pageX;

        tableMemoryRef.current!.resizedLayout = applyResize(
          index,
          tableElementRef,
          layout,
          resizeWidth,
        );
      }
    },
    [index, layout, tableElementRef, tableMemoryRef],
  );

  const onMouseUp = React.useCallback(() => {
    isMouseDown.current = false;
  }, []);

  React.useEffect(() => {
    const { current } = resizeRef;

    if (current) {
      current.addEventListener('mousedown', onMouseDown);
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }

    return () => {
      if (current) {
        current.removeEventListener('mousedown', onMouseDown);
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      }
    };
  }, [onMouseDown, onMouseMove, onMouseUp]);

  return { resizeRef };
};
