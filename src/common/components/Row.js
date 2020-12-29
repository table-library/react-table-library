import styled from 'styled-components';

import * as COLORS from '@common/colors';

const RowContainerBase = styled.div`
  display: flex;
  align-items: stretch;
`;

const RowContainer = styled(RowContainerBase)`
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

  position: relative;
  z-index: 1;

  &:hover {
    z-index: 2;
  }

  &:not(:last-child) {
    margin-bottom: -1px;
  }

  ${({ css }) => css};
`;

const HeaderRowContainer = styled(RowContainerBase)`
  border-bottom: 1px solid ${COLORS.BORDER};

  font-size: 18px;
  color: ${COLORS.FONT_PRIMARY};

  ${({ css }) => css};
`;

export { RowContainerBase, RowContainer, HeaderRowContainer };
