import * as React from 'react';
/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';

import { LayoutContext } from '@table-library/react-table-library/common/context';

import { Nullish } from '@table-library/react-table-library/types/common';

const getBaseStyle = () => `
  display: contents;

  ${() => {
    /* #1 */
    // otherwise tree + resize would have overflow icons */
    // otherwise pin shine through */
  }}
  background-color: #ffffff;
`;

const getRowContainerStyle = () => css`
  ${getBaseStyle()}
`;

const RowContainer = React.forwardRef(
  (props: Record<string, any>, ref: React.ForwardedRef<HTMLTableRowElement> | Nullish) => {
    const context = React.useContext(LayoutContext);

    if (!context) {
      throw new Error('No Layout Context.');
    }

    const { layout } = context;

    const As = layout?.isDiv ? 'div' : 'tr';

    return <As css={getRowContainerStyle()} ref={ref} {...props} />;
  },
);

const getHeaderRowContainerStyle = () => css`
  ${getBaseStyle()}
`;

const HeaderRowContainer = React.forwardRef(
  (props: Record<string, any>, ref: React.ForwardedRef<HTMLTableRowElement> | Nullish) => {
    const context = React.useContext(LayoutContext);

    if (!context) {
      throw new Error('No Layout Context.');
    }

    const { layout } = context;

    const As = layout?.isDiv ? 'div' : 'tr';

    return <As css={getHeaderRowContainerStyle()} ref={ref} {...props} />;
  },
);

export { RowContainer, HeaderRowContainer };
