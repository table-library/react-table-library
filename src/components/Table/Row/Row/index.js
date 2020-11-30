import * as React from 'react';
import PropTypes from 'prop-types';
import { css } from 'styled-components';
import cs from 'classnames';

import { RowContainer } from '@shared';
import { ThemeContext } from '@context';

const Row = ({
  _theme,
  _className,
  className,
  disabled,
  onClick = () => {},
  children
}) => {
  const theme = React.useContext(ThemeContext);

  return (
    <RowContainer
      onClick={onClick}
      className={cs('tr', className, _className, { disabled })}
      css={css`
        ${_theme}
        ${theme?.Row}
      `}
    >
      {children}
    </RowContainer>
  );
};

Row.propTypes = {
  _theme: PropTypes.string,
  _className: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func
  ])
};

export { Row };
