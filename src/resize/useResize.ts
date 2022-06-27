import * as React from 'react';

import { Nullish } from '@table-library/react-table-library/types/common';
import { Layout, TableElementRef } from '@table-library/react-table-library/types/layout';

import {
  LayoutContext,
  propagateResizedLayout,
  setResizedLayout,
} from '@table-library/react-table-library/common/context/Layout';
import {
  DataColumn,
  toDataColumn,
  getHeaderColumns,
  applyToHeaderColumns,
  applyToColumns,
} from '@table-library/react-table-library/common/util/columns';

const applySize = (
  index: number,
  layout: Layout | Nullish,
  tableElementRef: TableElementRef,
  resizeWidth: number,
) => {
  let dataColumns = getHeaderColumns(tableElementRef)
    .map(toDataColumn)
    .filter((column) => !column.isHide);

  const actualIndex = dataColumns.findIndex((column) => column.index === index);

  dataColumns = dataColumns.map((value, i) => ({ ...value, index: i }));

  // after column is needed for adjusting the size of the next column when resizing the current column
  // e.g. current column becomes larger, after column becomes smaller

  const afterColumn = dataColumns.reduce(
    (acc: DataColumn | Nullish, dataColumn: DataColumn, j: number) => {
      if (acc) return acc;
      if (j > actualIndex && dataColumn.width !== 0) return dataColumn;

      return acc;
    },
    null,
  );

  const tableWidth = dataColumns.reduce((acc, dataColumn) => acc + dataColumn.width, 0);

  const { minWidth } = dataColumns[actualIndex];
  const proposedWidth = resizeWidth > minWidth && resizeWidth !== 0 ? resizeWidth : minWidth;
  const diffWidth = proposedWidth - dataColumns[actualIndex].width;

  // calculate new widths of cell under consideration of its neighbors

  const newColumnWidthsAsPx = dataColumns.map((column, i) => {
    if (afterColumn && actualIndex === i) {
      const nextWidth = afterColumn.width - diffWidth;
      const willNextAdjust = nextWidth > minWidth;

      return willNextAdjust ? proposedWidth : column.width;
    }

    if (afterColumn?.index === i) {
      const nextWidth = column.width - diffWidth;
      const shouldAdjust = nextWidth > minWidth;

      return shouldAdjust ? nextWidth : column.width;
    }

    return column.width;
  });

  // we do want to have full table width again, not wider and not narrower
  const diff = tableWidth - newColumnWidthsAsPx.reduce((acc, value) => acc + value, 0);
  newColumnWidthsAsPx[actualIndex] = newColumnWidthsAsPx[actualIndex] + diff;

  let isStretchedInluded = false;

  const resizedLayout = dataColumns
    // mapRight
    .slice(0)
    .reverse()
    .map((column, i) => {
      const pixel = newColumnWidthsAsPx.slice(0).reverse()[i]; // mapRight
      const percentage = (pixel / tableWidth) * 100;

      if (column.isStiff || layout?.horizontalScroll) {
        return `${pixel}px`;
      }

      if (!isStretchedInluded) {
        isStretchedInluded = true;
        return `minmax(0, 1fr)`;
      }

      return `minmax(0, ${percentage}%)`;
    })
    .slice(0) // reverse mapRight
    .reverse()
    .join(' ');

  // pin feature

  const applyFixedColumn = (cell: HTMLElement, i: number) => {
    if ([...Array.from(cell.classList)].includes('pin-left')) {
      const left = newColumnWidthsAsPx.reduce((sum, v, j) => {
        if (j >= i) return sum;
        return sum + v;
      }, 0);

      cell.style.left = `${left}px`;
    }

    if ([...Array.from(cell.classList)].includes('pin-right')) {
      const right = newColumnWidthsAsPx.reduceRight((sum, v, j) => {
        if (j <= i) return sum;
        return sum + v;
      }, 0);

      cell.style.right = `${right}px`;
    }
  };

  applyToHeaderColumns(tableElementRef, applyFixedColumn);
  applyToColumns(tableElementRef, applyFixedColumn);

  return resizedLayout;
};

export const useResize = (index: number, hide: boolean | Nullish) => {
  const context = React.useContext(LayoutContext);

  if (!context) {
    throw new Error('No Layout Context.');
  }

  const { tableElementRef, tableMemoryRef, layout } = context;

  const cellRef = React.useRef<HTMLTableCellElement>(null);
  const resizeRef = React.useRef<HTMLSpanElement>(null);

  const previousGrid = React.useRef<string>('');

  const startOffset = React.useRef<number | null>(null);
  const isMouseDown = React.useRef<boolean>(false);

  const onMouseDown = React.useCallback(
    (event) => {
      event.preventDefault();

      previousGrid.current = tableElementRef.current!.style.getPropertyValue(
        '--data-table-library_grid-template-columns',
      );

      isMouseDown.current = true;
      startOffset.current = cellRef.current!.offsetWidth - event.pageX;
    },
    [tableElementRef],
  );

  const onMouseMove = React.useCallback(
    (event) => {
      if (isMouseDown.current) {
        event.preventDefault();

        const resizeWidth = startOffset.current + event.pageX;
        const resizedLayout = applySize(index, layout, tableElementRef, resizeWidth);

        setResizedLayout(resizedLayout, tableElementRef, tableMemoryRef);
      }
    },
    [index, layout, tableElementRef, tableMemoryRef],
  );

  const onMouseUp = React.useCallback(() => {
    isMouseDown.current = false;

    const resizedLayout = tableElementRef.current!.style.getPropertyValue(
      '--data-table-library_grid-template-columns',
    );

    const didChange = previousGrid.current !== resizedLayout;

    if (didChange) {
      propagateResizedLayout(resizedLayout, layout);

      const newPreservedDataColumns = getHeaderColumns(tableElementRef).map(toDataColumn);
      tableMemoryRef.current!.dataColumns = newPreservedDataColumns;
    }
  }, [layout, tableElementRef, tableMemoryRef]);

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
  }, [hide, onMouseDown, onMouseMove, onMouseUp]);

  return { cellRef, resizeRef };
};
