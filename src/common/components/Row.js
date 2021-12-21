import * as React from 'react';

import * as COLORS from '@table-library/react-table-library/common/colors';
import { LayoutContext } from '@table-library/react-table-library/common/context/Layout';

const getBaseStyle = (layout) => `
  display: flex;
  align-items: stretch;

  ${() => {
    /* otherwise pin feature pushes pined columns eventually outside if sum of all column widths is greater than container size */
    /* https://stackoverflow.com/a/57437315/1189762 */
  }}
  ${layout?.horizontalScroll && 'min-width: max-content;'}
`;

const getRowContainerStyle = (layout) => `
  ${getBaseStyle(layout)}

  ${() => {
    /* #1 */
  }}
  background-color: ${COLORS.BACKGROUND};

  font-size: 18px;
  color: ${COLORS.FONT_SECONDARY};

  &:hover {
    color: ${COLORS.FONT_PRIMARY};
  }

  &.disabled {
    color: ${COLORS.FONT_DISABLED};
  }

  &.clickable {
    cursor: pointer;
  }
`;

const RowContainer = React.forwardRef((props, ref) => {
  const { layout } = React.useContext(LayoutContext);

  return (
    <div {...props} css={getRowContainerStyle(layout)} ref={ref} />
  );
});

const getHeaderRowContainerStyle = (layout) => `
  ${getBaseStyle(layout)}

  font-size: 18px;
  color: ${COLORS.FONT_PRIMARY};
`;

const HeaderRowContainer = React.forwardRef((props, ref) => {
  const { layout } = React.useContext(LayoutContext);

  return (
    <div
      {...props}
      css={getHeaderRowContainerStyle(layout)}
      ref={ref}
    />
  );
});

export { RowContainer, HeaderRowContainer };
