import * as React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import * as COLORS from '@colors';

const RowBase = ({ children }) => {
  return React.Children.map(children, child =>
    React.cloneElement(child)
  );
};

RowBase.propTypes = {
  disabled: PropTypes.bool,
  children: PropTypes.node.isRequired
};

const RowContainerBase = styled.div`
  display: flex;
  align-items: center;
`;

const RowContainer = styled(RowContainerBase)`
  font-size: 14px;
  color: ${COLORS.FONT_SECONDARY};

  &:hover > div {
    color: ${COLORS.FONT_PRIMARY};
  }

  &.disabled {
    color: ${COLORS.FONT_DISABLED};
  }

  ${({ css }) => css};
`;

const HeaderRowContainer = styled(RowContainerBase)`
  font-size: 14px;
  color: ${COLORS.FONT_PRIMARY};

  & > div {
    border-bottom: 1px solid ${COLORS.BORDER};
  }

  ${({ css }) => css};
`;

export {
  RowBase,
  RowContainerBase,
  RowContainer,
  HeaderRowContainer
};
