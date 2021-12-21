import * as React from 'react';

import * as COLORS from '@table-library/react-table-library/common/colors';

const GUTTER = 6;

const BASE_STYLE = `
  display: flex;
  align-items: center;

  padding-top: 4px;
  padding-bottom: 4px;

  &:not(.stiff) > div {
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

  &.stiff > div {
    padding-right: ${GUTTER}px;
    padding-left: ${GUTTER}px;
  }

  &.hide {
    display: none;
  }

  &.pin {
    position: sticky;
    left: 0;
    z-index: 3;
  }
`;

const CELL_CONTAINER_STYLE = () => `
  ${BASE_STYLE}

  ${() => {
    /* #1 */
    // otherwise tree + resize would have overflow icons */
  }}
  background-color: inherit;
`;

const CellContainer = React.forwardRef((props, ref) => {
  return <div {...props} css={CELL_CONTAINER_STYLE} ref={ref} />;
});

const HEADER_CELL_CONTAINER_STYLE = `
  ${BASE_STYLE}

  position: relative;

  background-color: ${COLORS.BACKGROUND};
  border-bottom: 1px solid ${COLORS.BORDER};

  svg,
  path {
    fill: currentColor;
  }
`;

const HeaderCellContainer = React.forwardRef((props, ref) => {
  return (
    <div {...props} css={HEADER_CELL_CONTAINER_STYLE} ref={ref} />
  );
});

export { CellContainer, HeaderCellContainer };
