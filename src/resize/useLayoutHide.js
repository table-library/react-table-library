import * as React from 'react';

import { LayoutContext } from '@table-library/react-table-library/common/context/Layout';

import {
  getHeaderColumns,
  applyToHeaderColumns,
  applyToColumns,
} from '@table-library/react-table-library/common/util/columns';

const hideSpace = (column, columns) => {
  let resizeWidth = 0;

  const prioritizedColumns = [
    ...columns.slice(0, column.index).reverse(),
    ...columns.slice(column.index, columns.length),
  ];

  const withHiddenColumns = prioritizedColumns.map((value) => {
    const itself = value.index === column.index;

    if (itself) {
      resizeWidth = value.width;
      return { ...value, width: 0 };
    }

    return value;
  });

  const withFilledColumns = withHiddenColumns.map((value) => {
    const notItself = value.index !== column.index;
    const notHidden = value.width !== 0 && !value.isHide;
    const notStiff = !value.isStiff;

    if (notItself && notHidden && notStiff && resizeWidth > 0) {
      const newValue = { ...value, width: value.width + resizeWidth };
      resizeWidth = 0;
      return newValue;
    }

    return value;
  });

  return withFilledColumns.sort((a, b) => a.index - b.index);
};

const fillSpace = (column, columns, widthInMemory) => {
  const prioritizedColumns = [
    ...columns.slice(0, column.index).reverse(),
    ...columns.slice(column.index, columns.length),
  ].sort((a, b) => b.width - a.width);

  const totalSpaceAvailable = columns.reduce((acc, value) => {
    const cannotGiveSpaceAway =
      value.width === 0 ||
      value.isStiff ||
      value.width < value.minResizeWidth;

    if (cannotGiveSpaceAway) {
      return acc;
    }

    return acc + value.width - value.minResizeWidth;
  }, 0);

  const resizeWidthWithFallback =
    widthInMemory > columns[column.index].minResizeWidth
      ? widthInMemory
      : columns[column.index].minResizeWidth;

  const enoughSpaceAvailable =
    totalSpaceAvailable > resizeWidthWithFallback;

  let neededSpace = enoughSpaceAvailable
    ? resizeWidthWithFallback
    : totalSpaceAvailable;

  const withFilledColumns = prioritizedColumns.map((value) => {
    if (value.index === column.index) {
      return { ...value, width: neededSpace };
    }

    return value;
  });

  const withRemovedSpaceColumns = withFilledColumns.map((value) => {
    const spaceAvailable = value.width - value.minResizeWidth;
    const notStiff = !value.isStiff;
    const notRevealingColumn = value.index !== column.index;

    const shouldGrow =
      neededSpace !== 0 &&
      spaceAvailable > 0 &&
      notStiff &&
      notRevealingColumn;

    if (shouldGrow) {
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

  return withRemovedSpaceColumns.sort((a, b) => a.index - b.index);
};

const distributeSpaceOfHiddenColumns = (
  dataColumns,
  tableMemoryRef
) => {
  return dataColumns.reduce((acc, column) => {
    const { index, width, isHide } = column;

    // prevent things on re-render, because we cannot memorize the previous hide state

    if (!isHide && width > 0) {
      return acc;
    }

    if (isHide && width === 0) {
      return acc;
    }

    const space = tableMemoryRef.current.hiddenSpacesInMemory[index];

    const adjustedColumns = isHide
      ? hideSpace(column, acc)
      : fillSpace(column, acc, space);

    // put space in memory before setting it to 0
    // this way it can be used when column is revealed again
    // remove space from memory when it has been filled up

    if (isHide) {
      tableMemoryRef.current.hiddenSpacesInMemory[index] =
        acc[index].width;
    } else {
      delete tableMemoryRef.current.hiddenSpacesInMemory[index];
    }

    return adjustedColumns;
  }, dataColumns);
};

const performHide = (dataColumns, tableElementRef, layout) => {
  const tableWidth = tableElementRef.current
    .querySelector('.thead')
    .getBoundingClientRect().width;

  const columnWidths = dataColumns.map((column) => {
    const px = column.width;
    const percentage = (px / tableWidth) * 100;

    return column.isStiff || layout?.horizontalScroll
      ? `${px}px`
      : `${percentage}%`;
  });

  const applyWidth = (cell, i) => {
    cell.style.width = columnWidths[i];
    cell.style.minWidth = columnWidths[i];
  };

  applyToHeaderColumns(tableElementRef, applyWidth);
  applyToColumns(tableElementRef, applyWidth);

  const applyHide = (cell, i) => {
    if (dataColumns[i].isHide && dataColumns[i].width === 0) {
      cell.classList.add('hide');
    } else {
      cell.classList.remove('hide');
    }
  };

  applyToHeaderColumns(tableElementRef, applyHide);
  applyToColumns(tableElementRef, applyHide);

  return columnWidths;
};

export const useLayoutHide = () => {
  const {
    tableElementRef,
    tableMemoryRef,
    layout,
  } = React.useContext(LayoutContext);

  React.useLayoutEffect(() => {
    const dataColumns = getHeaderColumns(tableElementRef).map(
      (headerCell, j) => ({
        index: j,
        minResizeWidth: +headerCell.getAttribute(
          'data-resize-min-width'
        ),
        width: headerCell.getBoundingClientRect().width,
        isStiff: headerCell.classList.contains('stiff'),
        isHide: (layout?.hiddenColumns || []).includes(
          headerCell.getAttribute('data-cell-key')
        ),
      })
    );

    const adjustedDataColumns = distributeSpaceOfHiddenColumns(
      dataColumns,
      tableMemoryRef
    );

    tableMemoryRef.current.resizedLayout = performHide(
      adjustedDataColumns,
      tableElementRef,
      layout
    );
  }, [tableElementRef, tableMemoryRef, layout]);
};
