import * as React from 'react';

import { ResizeContext } from '@table-library/react-table-library/common/context/Resize';

const getHeaderColumns = (tableRef) =>
  Array.from(
    tableRef.current
      .querySelector('.tr-header')
      .querySelectorAll('.th')
  );

const applyToHeaderColumns = (tableRef, callback) =>
  getHeaderColumns(tableRef).forEach(callback);

const applyToColumns = (tableRef, callback) =>
  Array.from(
    tableRef.current.querySelectorAll('.tr-body')
  ).map((row) =>
    Array.from(row.querySelectorAll('.td')).forEach(callback)
  );

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

const applyHide = (index, tableRef, resize, hides, hide) => {
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

  const tableOffset = resize?.offset || 0;
  const tableWidth = tableRef.current.getBoundingClientRect().width;

  const columnWidthsPercentages = newColumnWidths.map(
    (width) => `${(width / (tableWidth - tableOffset)) * 100}%`
  );

  // imperative write of all cell widths

  const applyWidth = (cell, i) => {
    cell.style.width = columnWidthsPercentages[i];

    if (i === index) {
      if (hide) {
        cell.classList.add('hide');
      } else {
        cell.classList.remove('hide');
      }
    }
  };

  applyToHeaderColumns(tableRef, applyWidth);
  applyToColumns(tableRef, applyWidth);

  return columnWidthsPercentages;
};

const applyResize = (index, tableRef, resize, resizeWidth) => {
  const headerColumns = getHeaderColumns(tableRef);

  const columns = headerColumns.map((headerCell, j) => ({
    index: j,
    minResizeWidth: +headerCell.getAttribute('data-resize-min-width'),
    width: headerCell.getBoundingClientRect().width,
  }));

  const afterColumn = columns.reduce((acc, value, j) => {
    if (acc) return acc;
    if (j > index && value.width !== 0) return value;

    return acc;
  }, null);

  const { minResizeWidth } = columns[index];

  const actualResizeWidth =
    resizeWidth > minResizeWidth ? resizeWidth : minResizeWidth;

  const diffWidth = actualResizeWidth - columns[index].width;

  const newColumnWidths = columns.map((column, i) => {
    // resize

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

  const tableOffset = resize?.offset || 0;
  const tableWidth = tableRef.current.getBoundingClientRect().width;

  const columnWidthsPercentages = newColumnWidths.map(
    (width) => `${(width / (tableWidth - tableOffset)) * 100}%`
  );

  // imperative write of all cell widths

  const applyWidth = (cell, i) => {
    cell.style.width = columnWidthsPercentages[i];
  };

  applyToHeaderColumns(tableRef, applyWidth);
  applyToColumns(tableRef, applyWidth);

  return columnWidthsPercentages;
};

export const useResize = (cellRef, index, resize, hide) => {
  const { resizedLayout, tableRef } = React.useContext(ResizeContext);

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

        resizedLayout.current = applyResize(
          index,
          tableRef,
          resize,
          resizeWidth
        );
      }
    },
    [index, resize, resizedLayout, tableRef]
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

  const mounted = React.useRef(false);
  const previousHide = React.useRef();
  const hides = React.useRef({});

  React.useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      previousHide.current = hide;
      return;
    }

    if (previousHide.current === hide) return;
    previousHide.current = hide;

    resizedLayout.current = applyHide(
      index,
      tableRef,
      resize,
      hides,
      hide
    );
  }, [index, hide, resizedLayout, tableRef, resize]);

  return { resizeRef };
};
