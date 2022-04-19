import * as React from 'react';
/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';

import { LayoutContext } from '@table-library/react-table-library/common/context/Layout';

import { Nullish } from '@table-library/react-table-library/types/common';
import { Layout } from '@table-library/react-table-library/types/layout';

const getBaseStyle = (layout: Layout | Nullish) => `
  display: flex;
  align-items: stretch;

  ${() => {
    /* #1 */
    // otherwise tree + resize would have overflow icons */
    // otherwise pin shine through */
  }}
  background-color: #ffffff;

  ${() => {
    /* otherwise pin feature pushes pined columns eventually outside if sum of all column widths is greater than container size */
    /* https://stackoverflow.com/a/57437315/1189762 */
  }}
  ${layout?.horizontalScroll ? 'min-width: max-content;' : ''}
`;

const getRowContainerStyle = (layout: Layout | Nullish) => css`
  ${getBaseStyle(layout)}
`;

const RowContainer = React.forwardRef(
  (props: Record<string, any>, ref: React.ForwardedRef<HTMLDivElement> | Nullish) => {
    const context = React.useContext(LayoutContext);

    if (!context) {
      throw new Error('No Layout Context.');
    }

    const { layout } = context;

    return <div {...props} css={getRowContainerStyle(layout)} ref={ref} />;
  },
);

const getHeaderRowContainerStyle = (layout: Layout | Nullish) => css`
  ${getBaseStyle(layout)}
`;

const HeaderRowContainer = React.forwardRef(
  (props: Record<string, any>, ref: React.ForwardedRef<HTMLDivElement> | Nullish) => {
    const context = React.useContext(LayoutContext);

    if (!context) {
      throw new Error('No Layout Context.');
    }

    const { layout } = context;

    return <div {...props} css={getHeaderRowContainerStyle(layout)} ref={ref} />;
  },
);

export { RowContainer, HeaderRowContainer };
