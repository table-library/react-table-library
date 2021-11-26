import * as React from 'react';

import * as COLORS from '@table-library/react-table-library/common/colors';

const baseStyle = `
  display: flex;
  align-items: stretch;
`;

const rowContainerStyle = `
  ${baseStyle}

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
  return <div {...props} css={rowContainerStyle} ref={ref} />;
});

const headerRowContainerStyle = `
  ${baseStyle}

  background-color: ${COLORS.BACKGROUND};

  border-bottom: 1px solid ${COLORS.BORDER};

  font-size: 18px;
  color: ${COLORS.FONT_PRIMARY};
`;

const HeaderRowContainer = React.forwardRef((props, ref) => {
  return <div {...props} css={headerRowContainerStyle} ref={ref} />;
});

export { RowContainer, HeaderRowContainer };
