import * as React from 'react';

import * as COLORS from '@table-library/react-table-library/common/colors';
import { ResizeContext } from '@table-library/react-table-library/common/context/Resize';

const GUTTER = 6;

const baseStyle = (layout) => `
  ${() => {
    /* without custom layout, every cell uses equal size */
  }}
  ${!layout?.custom ? 'flex: 1' : ''};

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
    padding-right: ${GUTTER}px;
    padding-left: 20px;
  }

  &:last-child > div {
    padding-right: ${GUTTER}px;
  }

  border-right: 1px solid ${COLORS.BORDER};

  &:last-child {
    border-right: 0px solid transparent;
  }

  &.shrink > div {
    padding-right: ${GUTTER}px;
    padding-left: ${GUTTER}px;
  }

  &.hide {
    display: none;
  }
`;

const cellContainerStyle = (layout) => `
  ${baseStyle(layout)}

  ${() => {
    /* #1 otherwise tree + resize would have overflow icons */
  }}
  background-color: inherit;
`;

const CellContainer = React.forwardRef((props, ref) => {
  const { layout } = React.useContext(ResizeContext);

  return (
    <div {...props} css={cellContainerStyle(layout)} ref={ref} />
  );
});

const headerCellContainerStyle = (layout) => `
  ${baseStyle(layout)}

  position: relative;

  svg,
  path {
    fill: currentColor;
  }
`;

const HeaderCellContainer = React.forwardRef((props, ref) => {
  const { layout } = React.useContext(ResizeContext);

  return (
    <div
      {...props}
      css={headerCellContainerStyle(layout)}
      ref={ref}
    />
  );
});

export { CellContainer, HeaderCellContainer };
