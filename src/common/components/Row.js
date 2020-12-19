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

  ${({ css }) => css};
`;

const HeaderRowContainer = styled(RowContainerBase)`
  z-index: 3;

  border-bottom: 1px solid ${COLORS.BORDER};

  position: relative;

  font-size: 18px;
  color: ${COLORS.FONT_PRIMARY};

  ${({ css }) => css};
`;

export { RowContainerBase, RowContainer, HeaderRowContainer };
