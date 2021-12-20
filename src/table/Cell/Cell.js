import * as React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';

import { CellContainer } from '@table-library/react-table-library/common/components/Cell';
import { ThemeContext } from '@table-library/react-table-library/common/context/Theme';

import { useStyleHide } from '@table-library/react-table-library/resize';

const Cell = ({
  className,
  hide,
  pin,
  stiff,
  onClick,
  children,
  ...rest
}) => {
  const theme = React.useContext(ThemeContext);

  const cellRef = React.useRef();
  useStyleHide(cellRef, hide);

  return (
    <CellContainer
      {...rest}
      role="gridcell"
      className={cs('td', className, {
        stiff,
        pin,
      })}
      css={`
        ${theme?.BaseCell}
        ${theme?.Cell}
      `}
      onClick={onClick}
      ref={cellRef}
    >
      <div>{children}</div>
    </CellContainer>
  );
};

Cell.propTypes = {
  className: PropTypes.string,
  hide: PropTypes.bool,
  pin: PropTypes.bool,
  stiff: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func,
  ]),
};

export { Cell };
