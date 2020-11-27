import styled from 'styled-components';

import * as COLORS from '@colors';

const GUTTER_INNER = 12;
const GUTTER_OUTER = 8;

const CellContainerBase = styled.div`
  width: ${props => props.width};

  &:first-child > div {
    padding-left: ${GUTTER_OUTER}px;
  }

  & > div {
    padding-right: ${GUTTER_INNER}px;
  }

  &:last-child > div {
    padding-right: ${GUTTER_OUTER}px;
  }

  &:first-child > div {
    margin-left: ${({ indentation = 0 }) => 0 + indentation}px;
  }

  & > div {
    margin-left: ${({ indentation = 0 }) => 20 + indentation}px;
    margin-top: 4px;
    margin-bottom: 4px;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    border-right: 1px solid ${COLORS.BORDER};
  }

  &.shrink > div {
    padding-right: ${GUTTER_OUTER}px;
    padding-left: ${GUTTER_OUTER}px;
  }

  &:last-child > div {
    border-right: 1px solid transparent;
  }

  ${({ css }) => css};
`;

const CellContainer = styled(CellContainerBase)``;

const HeaderCellContainer = styled(CellContainerBase)``;

export { CellContainerBase, CellContainer, HeaderCellContainer };
