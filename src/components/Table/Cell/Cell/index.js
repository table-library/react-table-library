import * as React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';

import { CellContainer } from '@shared';
import { ThemeContext } from '@context';

const Cell = ({ width, className, indentation, children }) => {
  const theme = React.useContext(ThemeContext);

  return (
    <CellContainer
      className={cs('td', className)}
      css={theme?.Cell}
      width={width}
      indentation={indentation}
    >
      {children}
    </CellContainer>
  );
};

Cell.propTypes = {
  width: PropTypes.string.isRequired,
  className: PropTypes.string,
  indentation: PropTypes.number,
  children: PropTypes.node
};

export { Cell };
