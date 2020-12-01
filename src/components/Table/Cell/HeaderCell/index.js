import * as React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';

import { HeaderCellContainer } from '@shared';
import { ThemeContext } from '@context';

const HeaderCell = ({ width, className, indentation, children }) => {
  const theme = React.useContext(ThemeContext);

  return (
    <HeaderCellContainer
      role="columnheader"
      className={cs('th', className)}
      css={theme?.HeaderCell}
      width={width}
      indentation={indentation}
    >
      <div>{children}</div>
    </HeaderCellContainer>
  );
};

HeaderCell.propTypes = {
  width: PropTypes.string,
  className: PropTypes.string,
  indentation: PropTypes.number,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func
  ])
};

export { HeaderCell };
