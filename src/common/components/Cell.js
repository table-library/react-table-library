import styled from 'styled-components';

import * as COLORS from '@table-library/react-table-library/common/colors';

const GUTTER = 8;

const CellContainerBase = styled.div`
  display: flex;
  align-items: center;

  padding-top: 4px;
  padding-bottom: 4px;

  &:not(.shrink) > div {
    width: 100%;

    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &:first-child > div {
    padding-left: ${({ indentation = 0 }) => GUTTER + indentation}px;
  }

  & > div {
    padding-right: ${({ indentation = 0 }) => 20 + indentation}px;
    padding-left: ${({ indentation = 0 }) => 20 + indentation}px;
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

  ${({ css }) => css};
`;

const CellContainer = styled(CellContainerBase)`
  ${() => {
    /* #1 otherwise tree + resize would have overflow icons */
  }}
  background-color: inherit;
`;

const HeaderCellContainer = styled(CellContainerBase)`
  position: relative;

  svg,
  path {
    fill: currentColor;
  }
`;

export { CellContainerBase, CellContainer, HeaderCellContainer };
