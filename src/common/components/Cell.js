import * as React from 'react';

import * as COLORS from '@table-library/react-table-library/common/colors';

const GUTTER = 8;

const baseStyle = `
  display: flex;
  align-items: center;

  padding-top: 4px;
  padding-bottom: 4px;

  &:not(.shrink) > div {
    width: 100%;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &:first-child > div {
    padding-left: ${GUTTER}px;
  }

  & > div {
    padding-right: 20px;
    padding-left: 20px;
  }

  &:last-child > div {
    padding-right: ${GUTTER}px;
  }

  border-right: 1px solid ${COLORS.BORDER};

  &:last-child {
    border-right: 1px solid transparent;
  }

  &.shrink > div {
    padding-right: ${GUTTER}px;
    padding-left: ${GUTTER}px;
  }

  &.hide {
    display: none;
  }
`;

const cellContainerStyle = `
  ${baseStyle}

  ${() => {
    /* #1 otherwise tree + resize would have overflow icons */
  }}
  background-color: inherit;
`;

const CellContainer = React.forwardRef((props, ref) => {
  return <div {...props} css={cellContainerStyle} ref={ref} />;
});

const headerCellContainerStyle = `
  ${baseStyle}

  position: relative;

  svg,
  path {
    fill: currentColor;
  }
`;

const HeaderCellContainer = React.forwardRef((props, ref) => {
  return <div {...props} css={headerCellContainerStyle} ref={ref} />;
});

export { CellContainer, HeaderCellContainer };
