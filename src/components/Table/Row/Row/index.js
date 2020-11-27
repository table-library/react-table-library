import * as React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import cs from 'classnames';

import { RowBase, RowContainer as RowContainerBase } from '@shared';
import * as COLORS from '@colors';
import { ThemeContext } from '@context';

const RowContainer = styled(RowContainerBase)`
  font-size: 14px;
  color: ${COLORS.FONT_SECONDARY};

  &:hover * {
    color: ${COLORS.FONT_PRIMARY};
  }

  &.disabled {
    color: ${COLORS.FONT_DISABLED};
  }

  ${({ css }) => css};
`;

const Row = ({ className, disabled, children }) => {
  const theme = React.useContext(ThemeContext);

  return (
    <RowContainer
      className={cs('tr', className, { disabled })}
      css={theme?.Row}
    >
      <RowBase>{children}</RowBase>
    </RowContainer>
  );
};

Row.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  children: PropTypes.node.isRequired
};

export { Row };
