import * as React from 'react';

import * as COLORS from '@table-library/react-table-library/common/colors';
import { ResizeContext } from '@table-library/react-table-library/common/context/Resize';

const getBaseStyle = (layout) => `
  display: ${layout?.pin ? 'inline-flex' : 'flex'};
  align-items: stretch;
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
  const { layout } = React.useContext(ResizeContext);

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
  const { layout } = React.useContext(ResizeContext);

  return (
    <div
      {...props}
      css={getHeaderRowContainerStyle(layout)}
      ref={ref}
    />
  );
});

export { RowContainer, HeaderRowContainer };
