import * as React from 'react';
/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';

import { LayoutContext } from '@table-library/react-table-library/common/context';

const BASE_STYLE = `
  ${() => {
    // cells in a table come with margin/padding
    // this way, we are able to hide cells with setting width to 0
  }}
  padding: 0;
  margin: 0;

  ${() => {
    // center vertically if height > line-height
  }}
  display: flex;
  align-items: center;

  ${() => {
    // take whole space vertically
  }}
  align-self: stretch;


  & > div {
    ${() => {
      // take whole space horizontally
    }}
    flex: 1;

    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  &.hide {
    display: none;
  }

  &.pin-left,
  &.pin-right {
    position: sticky;
    z-index: 2;
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
  (props: Record<string, any>, ref: React.ForwardedRef<HTMLTableCellElement>) => {
    const context = React.useContext(LayoutContext);

    if (!context) {
      throw new Error('No Layout Context.');
    }

    const { layout } = context;

    const As = layout?.isDiv ? 'div' : 'td';

    return <As css={CELL_CONTAINER_STYLE} ref={ref} {...props} />;
  },
);

const HEADER_CELL_CONTAINER_STYLE = css`
  ${BASE_STYLE}

  z-index: 1;
  text-align: left;
  position: sticky;
  top: 0;

  &.pin-left,
  &.pin-right {
    z-index: 3;
  }
`;

const HeaderCellContainer = React.forwardRef(
  (props: Record<string, any>, ref: React.ForwardedRef<HTMLTableCellElement>) => {
    const context = React.useContext(LayoutContext);

    if (!context) {
      throw new Error('No Layout Context.');
    }

    const { layout } = context;

    const As = layout?.isDiv ? 'div' : 'th';

    return <As css={HEADER_CELL_CONTAINER_STYLE} ref={ref} {...props} />;
  },
);

export { CellContainer, HeaderCellContainer };
