import * as React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';

import { CellContainer } from '@table-library/react-table-library/common/components/Cell';
import { ThemeContext } from '@table-library/react-table-library/common/context/Theme';

const Cell = ({
  className,
  hide,
  shrink,
  onClick,
  children,
  ...rest
}) => {
  const theme = React.useContext(ThemeContext);

  return (
    <CellContainer
      {...rest}
      role="gridcell"
      className={cs('td', className, {
        hide,
        shrink,
      })}
      css={`
        ${theme?.BaseCell}
        ${theme?.Cell}
      `}
      onClick={onClick}
    >
      <div>{children}</div>
    </CellContainer>
  );
};

Cell.propTypes = {
  className: PropTypes.string,
  hide: PropTypes.bool,
  shrink: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func,
  ]),
};

export { Cell };
