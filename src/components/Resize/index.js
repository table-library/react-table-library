import * as React from 'react';
import styled from 'styled-components';

import { ResizeContext } from '@context';

export const Resizer = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  cursor: col-resize;
  width: 3px;
`;

export const useResize = columnIndex => {
  const { resize, resizedLayout, tableRef } = React.useContext(
    ResizeContext
  );

  const MIN_RESIZE_WIDTH = 75;

  const cellRef = React.useRef();
  const resizeRef = React.useRef();

  const startOffset = React.useRef();
  const isMouseDown = React.useRef(false);

  const onMouseDown = React.useCallback(event => {
    event.preventDefault();

    isMouseDown.current = true;
    startOffset.current = cellRef.current.offsetWidth - event.pageX;
  }, []);

  const onMouseMove = React.useCallback(
    event => {
      if (isMouseDown.current) {
        event.preventDefault();

        let resizeWidth = startOffset.current + event.pageX;

        resizeWidth =
          resizeWidth > MIN_RESIZE_WIDTH
            ? resizeWidth
            : MIN_RESIZE_WIDTH;

        const headerColumns = Array.from(
          tableRef.current
            .querySelector('.thead')
            .querySelector('.tr')
            .querySelectorAll('.th')
        );

        const tableWidth = tableRef.current.getBoundingClientRect()
          .width;

        const columnsWidths = headerColumns.map(
          headerCell => headerCell.getBoundingClientRect().width
        );

        const diffWidth = resizeWidth - columnsWidths[columnIndex];

        const newColumnWidths = columnsWidths
          .map((width, index) => {
            if (columnIndex === index) {
              const nextWidth = columnsWidths[index + 1] - diffWidth;
              const willNextAdjust = nextWidth > MIN_RESIZE_WIDTH;

              return willNextAdjust ? resizeWidth : width;
            }

            if (columnIndex + 1 === index) {
              const nextWidth = width - diffWidth;
              const shouldAdjust = nextWidth > MIN_RESIZE_WIDTH;

              return shouldAdjust ? nextWidth : width;
            }

            return width;
          })
          .map(width => `${(width / tableWidth) * 100}%`);

        headerColumns.forEach((headerCell, index) => {
          headerCell.style.width = newColumnWidths[index];
        });

        Array.from(
          tableRef.current
            .querySelector('.tbody')
            .querySelectorAll('.tr')
        ).map(row =>
          Array.from(row.querySelectorAll('.td')).forEach(
            (cell, index) => {
              cell.style.width = newColumnWidths[index];
            }
          )
        );

        resizedLayout.current = newColumnWidths;
      }
    },
    [columnIndex, resizedLayout, tableRef]
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

  return { resize, resizeRef, cellRef };
};
