import styled from 'styled-components';

import * as COLORS from '@colors';

const RowContainerBase = styled.div`
  display: flex;
  align-items: center;
`;

const RowContainer = styled(RowContainerBase)`
  position: relative;
  margin-top: -1px;
  z-index: 1;

  &:hover {
    z-index: 2;
  }

  font-size: 18px;
  color: ${COLORS.FONT_SECONDARY};

  &:hover {
    color: ${COLORS.FONT_PRIMARY};
  }

  &.disabled {
    color: ${COLORS.FONT_DISABLED};
  }

  ${({ css }) => css};
`;

const HeaderRowContainer = styled(RowContainerBase)`
  position: relative;

  border-bottom: 1px solid ${COLORS.BORDER};

  font-size: 18px;
  color: ${COLORS.FONT_PRIMARY};

  ${({ css }) => css};
`;

export { RowContainerBase, RowContainer, HeaderRowContainer };
