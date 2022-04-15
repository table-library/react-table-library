import * as React from 'react';

import { LayoutContext } from '@table-library/react-table-library/common/context/Layout';

import { Nullish } from '@table-library/react-table-library/types/common';
import { Layout } from '@table-library/react-table-library/types/layout';

// min-width: max-content
// otherwise pin feature pushes pined columns eventually outside if sum of all column widths is greater than container size
// https://stackoverflow.com/a/57437315/1189762
const getBaseStyle = (layout: Layout | Nullish) => `
  display: flex;
  align-items: stretch;

  ${layout?.horizontalScroll ? 'min-width: max-content;' : ''}
`;

const getRowContainerStyle = (layout: Layout | Nullish) => `
  [data-table-library="tr-body"] {
    ${getBaseStyle(layout)}
  }
`;

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
      <div {...props} ref={ref} data-table-library="tr-body">
        <style dangerouslySetInnerHTML={{ __html: getRowContainerStyle(layout) }} />
        {children}
      </div>
    );
  },
);

const getHeaderRowContainerStyle = (layout: Layout | Nullish) => `
  [data-table-library="tr-header"] {
    ${getBaseStyle(layout)}
  }
`;

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
      <div {...props} ref={ref} data-table-library="tr-header">
        <style dangerouslySetInnerHTML={{ __html: getHeaderRowContainerStyle(layout) }} />
        {children}
      </div>
    );
  },
);

export { RowContainer, HeaderRowContainer };
