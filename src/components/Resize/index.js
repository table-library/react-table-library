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

  const MIN_RESIZE_WIDTH = 50;

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

        const trs = tableRef.current.querySelectorAll('.tr');

        Array.from(trs).forEach(element => {
          const columns = element.style['grid-template-columns']
            .split(' ')
            .map((width, i) =>
              columnIndex === i ? `${resizeWidth}px` : width
            );

          resizedLayout.current = columns;

          element.style['grid-template-columns'] = columns.join(' ');
        });
      }
    },
    [columnIndex, tableRef, resizedLayout]
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
