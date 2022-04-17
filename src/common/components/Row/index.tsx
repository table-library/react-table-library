import * as React from 'react';

import { LayoutContext } from '@table-library/react-table-library/common/context/Layout';
import { Style } from '@table-library/react-table-library/common/components/Style';
import { Nullish } from '@table-library/react-table-library/types/common';

import { row, headerRow } from './styles';

const RowContainer = React.forwardRef(
  (
    { children, ...props }: Record<string, any>,
    ref: React.ForwardedRef<HTMLDivElement> | Nullish,
  ) => {
    const context = React.useContext(LayoutContext);

    if (!context) {
      throw new Error('No Layout Context.');
    }

    const { layout } = context;

    return (
      <div {...props} ref={ref} data-table-library_tr-body="">
        <Style __html={row(layout)} />
        {children}
      </div>
    );
  },
);

const HeaderRowContainer = React.forwardRef(
  (
    { children, ...props }: Record<string, any>,
    ref: React.ForwardedRef<HTMLDivElement> | Nullish,
  ) => {
    const context = React.useContext(LayoutContext);

    if (!context) {
      throw new Error('No Layout Context.');
    }

    const { layout } = context;

    return (
      <div {...props} ref={ref} data-table-library_tr-header="">
        <Style __html={headerRow(layout)} />
        {children}
      </div>
    );
  },
);

export { RowContainer, HeaderRowContainer };
