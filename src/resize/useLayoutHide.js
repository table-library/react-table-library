import * as React from 'react';

import { ResizeContext } from '@table-library/react-table-library/common/context/Resize';

import {
  getHeaderColumns,
  applyToHeaderColumns,
  applyToColumns,
} from './util';

const hideSpace = (index, columns) => {
  let resizeWidth = 0;

  const prioritizedColumns = [
    ...columns.slice(0, index).reverse(),
    ...columns.slice(index, columns.length),
  ];

  const withHiddenColumns = prioritizedColumns.map((value) => {
    if (value.index === index) {
      resizeWidth = value.width;
      return { ...value, width: 0 };
    }

    return value;
  });

  const withFilledColumns = withHiddenColumns.map((value) => {
    const notHidden = value.width !== 0;
    const notStiff = !value.isStiff;

    if (notHidden && notStiff && resizeWidth > 0) {
      const newValue = { ...value, width: value.width + resizeWidth };
      resizeWidth = 0;
      return newValue;
    }

    return value;
  });

  return withFilledColumns
    .sort((a, b) => a.index - b.index)
    .map((value) => value.width);
};

const fillSpace = (index, columns, resizeWidth) => {
  const totalSpaceAvailable = columns.reduce((acc, value) => {
    if (value.width === 0 || value.isStiff) {
      return acc;
    }

    return acc + value.width - value.minResizeWidth;
  }, 0);

  const resizeWidthWithFallback =
    resizeWidth || columns[index].minResizeWidth;

  const enoughSpaceAvailable =
    totalSpaceAvailable > resizeWidthWithFallback;

  let neededSpace = enoughSpaceAvailable
    ? resizeWidthWithFallback
    : totalSpaceAvailable;

  const prioritizedColumns = [
    ...columns.slice(0, index).reverse(),
    ...columns.slice(index, columns.length),
  ];

  const withFilledColumns = prioritizedColumns.map((value) => {
    if (value.index === index) {
      return { ...value, width: neededSpace };
    }

    return value;
  });

  const withRemovedSpaceColumns = withFilledColumns.map((value) => {
    const spaceAvailable = value.width - value.minResizeWidth;
    const notStiff = !value.isStiff;
    const notRevealingColumn = value.index !== index;

    if (
      neededSpace !== 0 &&
      spaceAvailable > 0 &&
      notStiff &&
      notRevealingColumn
    ) {
      const spaceToAllocate =
        neededSpace > spaceAvailable ? spaceAvailable : neededSpace;

      neededSpace -= spaceToAllocate;

      return {
        ...value,
        width: value.width - spaceToAllocate,
        minWidth: value.width - spaceToAllocate,
      };
    }

    return value;
  });

  return withRemovedSpaceColumns
    .sort((a, b) => a.index - b.index)
    .map((value) => value.width);
};

const applyHide = (index, tableRef, layout, hides, hide) => {
  const tableWidth = tableRef.current
    .querySelector('.thead')
    .getBoundingClientRect().width;

  const headerColumns = getHeaderColumns(tableRef);

  const columns = headerColumns.map((headerCell, j) => ({
    index: j,
    isStiff: headerCell.classList.contains('stiff'),
    minResizeWidth: +headerCell.getAttribute('data-resize-min-width'),
    width: headerCell.getBoundingClientRect().width,
  }));

  const newColumnWidthsAsPx = hide
    ? hideSpace(index, columns)
    : fillSpace(index, columns, hides.current[index]);

  // remember width before hiding the column
  if (hide) {
    hides.current[index] = columns[index].width;
  } else {
    delete hides.current[index];
  }

  const newColumnWidths = columns.map((column, i) => {
    const px = newColumnWidthsAsPx[i];
    const percentage = (px / tableWidth) * 100;

    return column.isStiff || layout?.horizontalScroll
      ? `${px}px`
      : `${percentage}%`;
  });

  const applyWidth = (cell, i) => {
    cell.style.width = newColumnWidths[i];
    cell.style.minWidth = newColumnWidths[i];
  };

  applyToHeaderColumns(tableRef, applyWidth);
  applyToColumns(tableRef, applyWidth);

  return newColumnWidths;
};

export const useLayoutHide = (index, hide) => {
  const { resizedLayout, tableRef, layout } = React.useContext(
    ResizeContext
  );

  const mounted = React.useRef(false);
  const previousHide = React.useRef();
  const hides = React.useRef({});

  React.useLayoutEffect(() => {
    if (previousHide.current === hide) return;

    // we do not want to hide on initial render
    // initialing hiding is done in useProduceRowLayout.js
    if (mounted.current) {
      resizedLayout.current = applyHide(
        index,
        tableRef,
        layout,
        hides,
        hide
      );
    }

    mounted.current = true;
    previousHide.current = hide;
  }, [index, hide, resizedLayout, tableRef, layout]);
};
