import * as React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';

import { HeaderRowContainer } from '@shared';
import { ThemeContext } from '@context';

const HeaderRow = ({ className, disabled, children }) => {
  const theme = React.useContext(ThemeContext);

  return (
    <HeaderRowContainer
      className={cs('tr', className, { disabled })}
      css={theme?.HeaderRow}
    >
      {children}
    </HeaderRowContainer>
  );
};

HeaderRow.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  children: PropTypes.node.isRequired
};

export { HeaderRow };
