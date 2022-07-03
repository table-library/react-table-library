/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx, SerializedStyles } from '@emotion/react';

import { ColumnResizeProps } from '@table-library/react-table-library/types/resize';

const resizerStyle = (
  resize: ColumnResizeProps,
): { handle: SerializedStyles; area: SerializedStyles } => {
  const width =
    typeof resize === 'boolean' || resize?.resizerWidth == null ? 10 : resize.resizerWidth;

  const highlight =
    typeof resize === 'boolean' || resize?.resizerHighlight == null
      ? 'transparent'
      : resize.resizerHighlight;

  return {
    handle: css`
      z-index: 2;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;

      width: 1px;
      margin: 4px 0;
    `,
    area: css`
      z-index: 1;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;

      cursor: ew-resize;
      width: ${width}px;
      height: 100%;

      &:hover,
      &.active {
        background-color: ${highlight};
      }
    `,
  };
};

export { resizerStyle };
