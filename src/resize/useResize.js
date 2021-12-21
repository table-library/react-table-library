import * as React from 'react';

import { LayoutContext } from '@table-library/react-table-library/common/context/Layout';
import {
  getHeaderColumns,
  applyToHeaderColumns,
  applyToColumns,
} from '@table-library/react-table-library/common/util/columns';

const applyResize = (index, tableElementRef, layout, resizeWidth) => {
  const headerColumns = getHeaderColumns(tableElementRef);

  const columns = headerColumns.map((headerCell, j) => ({
    index: j,
    minResizeWidth: +headerCell.getAttribute('data-resize-min-width'),
    width: headerCell.getBoundingClientRect().width,
    isStiff: headerCell.classList.contains('stiff'),
  }));

  const afterColumn = columns.reduce((acc, value, j) => {
    if (acc) return acc;
    if (j > index && value.width !== 0) return value;

    return acc;
  }, null);

  const tableWidth = tableElementRef.current
    .querySelector('.thead')
    .getBoundingClientRect().width;

  const { minResizeWidth } = columns[index];

  const actualResizeWidth =
    resizeWidth > minResizeWidth ? resizeWidth : minResizeWidth;

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
    return column.isStiff || layout?.horizontalScroll
      ? `${px}px`
      : `${percentage}%`;
  });

  // imperative write of all cell widths

  const applyWidth = (cell, i) => {
    cell.style.width = newColumnWidths[i];
    cell.style.minWidth = newColumnWidths[i];
  };

  // pin feature as edge case

  const applyLeft = (cell, i) => {
    if ([...cell.classList].includes('pin')) {
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

export const useResize = (cellRef, index) => {
  const {
    tableMemoryRef,
    layout,
    tableElementRef,
  } = React.useContext(LayoutContext);

  const resizeRef = React.useRef();

  const startOffset = React.useRef();
  const isMouseDown = React.useRef(false);

  const onMouseDown = React.useCallback(
    (event) => {
      event.preventDefault();

      isMouseDown.current = true;
      startOffset.current = cellRef.current.offsetWidth - event.pageX;
    },
    [cellRef]
  );

  const onMouseMove = React.useCallback(
    (event) => {
      if (isMouseDown.current) {
        event.preventDefault();

        const resizeWidth = startOffset.current + event.pageX;

        tableMemoryRef.current.resizedLayout = applyResize(
          index,
          tableElementRef,
          layout,
          resizeWidth
        );
      }
    },
    [index, layout, tableElementRef, tableMemoryRef]
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
