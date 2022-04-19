import * as React from 'react';
/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';

const BASE_STYLE = `
  display: flex;
  align-items: center;

  &.hide {
    display: none;
  }

  &.pin-left,
  &.pin-right {
    position: sticky;
    z-index: 3;
  }

  &:not(.stiff) > div {
    width: 100%;
  }

  ${() => {
    /* #1 */
    // otherwise tree + resize would have overflow icons */
    // otherwise pin shine through */
  }}
  background-color: inherit;
`;

const CELL_CONTAINER_STYLE = css`
  ${BASE_STYLE}
`;

const CellContainer = React.forwardRef(
  (props: Record<string, any>, ref: React.ForwardedRef<HTMLDivElement>) => {
    return <div css={CELL_CONTAINER_STYLE} ref={ref} {...props} />;
  },
);

const HEADER_CELL_CONTAINER_STYLE = css`
  ${BASE_STYLE}

  position: relative;
`;

const HeaderCellContainer = React.forwardRef(
  (props: Record<string, any>, ref: React.ForwardedRef<HTMLDivElement>) => {
    return <div css={HEADER_CELL_CONTAINER_STYLE} ref={ref} {...props} />;
  },
);

export { CellContainer, HeaderCellContainer };
