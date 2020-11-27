import * as React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';

import { RowBase, RowContainer } from '@shared';
import { ThemeContext } from '@context';

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
