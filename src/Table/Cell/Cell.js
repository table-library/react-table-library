import * as React from 'react';
import PropTypes from 'prop-types';
import { css } from 'styled-components';
import cs from 'classnames';

import { CellContainer } from '@common/components/Cell';
import { ThemeContext } from '@common/context/Theme';

const Cell = ({ className, indentation, hide, shrink, children }) => {
  const theme = React.useContext(ThemeContext);

  return (
    <CellContainer
      role="gridcell"
      className={cs('td', className, {
        hide,
        shrink
      })}
      css={css`
        ${theme?.BaseCell}
        ${theme?.Cell}
      `}
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
  shrink: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func
  ])
};

export { Cell };
