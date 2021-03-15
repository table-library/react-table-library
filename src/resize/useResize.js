import * as React from 'react';

import { ResizeContext } from '@table-library/react-table-library/common/context/Resize';

export const useResize = (columnIndex, resize) => {
  const { resizedLayout, tableRef } = React.useContext(ResizeContext);

  const cellRef = React.useRef();
  const resizeRef = React.useRef();

  const startOffset = React.useRef();
  const isMouseDown = React.useRef(false);

  const onMouseDown = React.useCallback((event) => {
    event.preventDefault();

    isMouseDown.current = true;
    startOffset.current = cellRef.current.offsetWidth - event.pageX;
  }, []);

  const onMouseMove = React.useCallback(
    (event) => {
      if (isMouseDown.current) {
        event.preventDefault();

        const minResizeWidth = resize?.minWidth || 75;
        let resizeWidth = startOffset.current + event.pageX;

        resizeWidth =
          resizeWidth > minResizeWidth ? resizeWidth : minResizeWidth;

        const headerColumns = Array.from(
          tableRef.current
            .querySelector('.tr-header')
            .querySelectorAll('.th')
        );

        const tableOffset = resize?.offset || 0;
        const tableWidth = tableRef.current.getBoundingClientRect()
          .width;

        const columnsWidths = headerColumns.map(
          (headerCell) => headerCell.getBoundingClientRect().width
        );

        const diffWidth = resizeWidth - columnsWidths[columnIndex];

        const newColumnWidths = columnsWidths
          .map((width, index) => {
            if (columnIndex === index) {
              const nextWidth = columnsWidths[index + 1] - diffWidth;
              const willNextAdjust = nextWidth > minResizeWidth;

              return willNextAdjust ? resizeWidth : width;
            }

            if (columnIndex + 1 === index) {
              const nextWidth = width - diffWidth;
              const shouldAdjust = nextWidth > minResizeWidth;

              return shouldAdjust ? nextWidth : width;
            }

            return width;
          })
          .map(
            (width) =>
              `${(width / (tableWidth - tableOffset)) * 100}%`
          );

        headerColumns.forEach((headerCell, index) => {
          headerCell.style.width = newColumnWidths[index];
        });

        Array.from(tableRef.current.querySelectorAll('.tr-body')).map(
          (row) =>
            Array.from(row.querySelectorAll('.td')).forEach(
              (cell, index) => {
                cell.style.width = newColumnWidths[index];
              }
            )
        );

        resizedLayout.current = newColumnWidths;
      }
    },
    [columnIndex, resize, resizedLayout, tableRef]
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

  return { resizeRef, cellRef };
};
