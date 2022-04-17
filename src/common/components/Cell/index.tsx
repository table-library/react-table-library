import * as React from 'react';

import { Style } from '@table-library/react-table-library/common/components/Style';

import { cell, headerCell } from './styles';

const CellContainer = React.forwardRef(
  ({ children, ...props }: Record<string, any>, ref: React.ForwardedRef<HTMLDivElement>) => {
    return (
      <div {...props} ref={ref} data-table-library_td="">
        <Style __html={cell(props)} />
        {children}
      </div>
    );
  },
);

const HeaderCellContainer = React.forwardRef(
  ({ children, ...props }: Record<string, any>, ref: React.ForwardedRef<HTMLDivElement>) => {
    return (
      <div {...props} ref={ref} data-table-library_th="">
        <Style __html={headerCell(props)} />
        {children}
      </div>
    );
  },
);

export { CellContainer, HeaderCellContainer };
