import * as React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import cs from 'classnames';

import { RowBase, RowContainer as RowContainerBase } from '@shared';
import * as COLORS from '@colors';
import { ThemeContext } from '@context';

const HeaderRowContainer = styled(RowContainerBase)`
  font-size: 14px;
  color: ${COLORS.FONT_PRIMARY};

  & > div {
    border-bottom: 1px solid ${COLORS.BORDER};
  }

  ${({ css }) => css};
`;

const HeaderRow = ({ className, disabled, children }) => {
  const theme = React.useContext(ThemeContext);

  return (
    <HeaderRowContainer
      className={cs('tr', className, { disabled })}
      css={theme?.HeaderRow}
    >
      <RowBase>{children}</RowBase>
    </HeaderRowContainer>
  );
};

HeaderRow.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  children: PropTypes.node.isRequired
};

export { HeaderRow };
