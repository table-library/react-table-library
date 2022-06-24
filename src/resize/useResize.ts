import * as React from 'react';

import { Nullish } from '@table-library/react-table-library/types/common';
import { TableElementRef } from '@table-library/react-table-library/types/layout';

import { LayoutContext } from '@table-library/react-table-library/common/context/Layout';
import {
  DataColumn,
  toDataColumn,
  getHeaderColumns,
  applyToHeaderColumns,
  applyToColumns,
} from '@table-library/react-table-library/common/util/columns';

const applySize = (index: number, tableElementRef: TableElementRef, resizeWidth: number) => {
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
  const isOverflow = !!((tableElementRef.current?.getBoundingClientRect().width || 0) < tableWidth);

  const { minWidth } = dataColumns[actualIndex];
  const proposedWidth = resizeWidth > minWidth || resizeWidth === 0 ? resizeWidth : minWidth;
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

  const resizedLayout = dataColumns
    .map((column, i) => {
      const pixel = newColumnWidthsAsPx[i];
      const percentage = (pixel / tableWidth) * 100;

      return column.isStiff || isOverflow ? `${pixel}px` : `minmax(${percentage}%, 1fr)`;
    })
    .join(' ');

  tableElementRef.current!.style.setProperty(
    '--data-table-library_grid-template-columns',
    resizedLayout,
  );

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
};

export const useResize = (index: number, hide: boolean | Nullish) => {
  const context = React.useContext(LayoutContext);

  if (!context) {
    throw new Error('No Layout Context.');
  }

  const { tableElementRef, layout } = context;

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

        applySize(index, tableElementRef, resizeWidth);
      }
    },
    [index, tableElementRef],
  );

  const onMouseUp = React.useCallback(() => {
    isMouseDown.current = false;

    const resizedLayout = tableElementRef.current!.style.getPropertyValue(
      '--data-table-library_grid-template-columns',
    );

    const didChange = previousGrid.current !== resizedLayout;

    if (layout?.onLayoutChange && didChange && resizedLayout !== '') {
      layout?.onLayoutChange(resizedLayout);
    }
  }, [layout, tableElementRef]);

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
