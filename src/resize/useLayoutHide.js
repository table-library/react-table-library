import * as React from 'react';

import { ResizeContext } from '@table-library/react-table-library/common/context/Resize';

import {
  getHeaderColumns,
  applyToHeaderColumns,
  applyToColumns,
} from './util';

const hideSpace = (index, columns) => {
  let goesUp = 0;
  let goesDown = 1;
  let resizeWidth = 0;

  const prioritizedColumns = [
    ...columns.slice(index, columns.length),
    ...columns.slice(0, index).reverse(),
  ];

  return (
    prioritizedColumns
      // hide column
      .map((value) => {
        if (goesDown === 1 && value.index === index) {
          goesDown = 0;
          resizeWidth = value.width;
          return { ...value, width: 0 };
        }

        return value;
      })
      // add hidden column space to next column
      .map((value) => {
        const notHidden = value.width !== 0;
        const { isResize } = value;
        if (goesUp === 0 && notHidden && isResize && resizeWidth) {
          goesUp = 1;
          return { ...value, width: value.width + resizeWidth };
        }

        return value;
      })
      .sort((a, b) => a.index - b.index)
      .map((value) => value.width)
  );
};

const fillSpace = (index, columns, resizeWidth) => {
  const spaceAvailable = columns.reduce((acc, value) => {
    if (value.width === 0) {
      return acc;
    }

    if (!value.isResize) {
      return acc;
    }

    return acc + value.width - value.minResizeWidth;
  }, 0);

  const enoughSpaceAvailable = spaceAvailable > resizeWidth;

  let neededSpace = enoughSpaceAvailable
    ? resizeWidth
    : spaceAvailable;

  const prioritizedColumns = columns.sort(
    (a, b) => b.width - a.width
  );

  return (
    prioritizedColumns
      // add space to hidden column
      .map((value) => {
        if (value.index === index) {
          return { ...value, width: neededSpace };
        }

        return value;
      })
      // remove space from columns
      .map((value) => {
        const spaceToOffer = value.width - value.minResizeWidth;
        const { isResize } = value;
        if (neededSpace !== 0 && spaceToOffer > 0 && isResize) {
          const spaceToAllocate =
            neededSpace > spaceToOffer ? spaceToOffer : neededSpace;

          neededSpace -= spaceToAllocate;

          return { ...value, width: value.width - spaceToAllocate };
        }

        return value;
      })
      .sort((a, b) => a.index - b.index)
      .map((value) => value.width)
  );
};

const applyHide = (index, tableRef, layout, hides, hide) => {
  const headerColumns = getHeaderColumns(tableRef);

  const columns = headerColumns.map((headerCell, j) => ({
    index: j,
    isResize:
      headerCell.classList.contains('resize') || // is this resize
      headerColumns[j - 1]?.classList.contains('resize'), // is previous resize
    minResizeWidth: +headerCell.getAttribute('data-resize-min-width'),
    width: headerCell.getBoundingClientRect().width,
  }));

  const newColumnWidths = hide
    ? hideSpace(index, columns)
    : fillSpace(index, columns, hides.current[index]);

  // remember width before hiding the column
  if (hide) {
    hides.current[index] = columns[index].width;
  } else {
    delete hides.current[index];
  }

  const applyWidth = (cell, i) => {
    cell.style.minWidth = `${newColumnWidths[i]}px`;
    cell.style.maxWidth = `${newColumnWidths[i]}px`;
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
