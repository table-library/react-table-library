import * as React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';

import { CellContainer } from '@shared/Cell';
import { ThemeContext } from '@context/Theme';

const Cell = ({ className, indentation, hide, children }) => {
  const theme = React.useContext(ThemeContext);

  return (
    <CellContainer
      role="gridcell"
      className={cs('td', className, {
        hide
      })}
      css={theme?.Cell}
      indentation={indentation}
    >
      <div>{children}</div>
    </CellContainer>
  );
};

Cell.propTypes = {
  className: PropTypes.string,
  indentation: PropTypes.number,
  hide: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func
  ])
};

export { Cell };
