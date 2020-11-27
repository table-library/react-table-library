import * as React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';

import { HeaderCellContainer } from '@shared';
import { ThemeContext } from '@context';

const HeaderCell = ({ width, className, indentation, children }) => {
  const theme = React.useContext(ThemeContext);

  return (
    <HeaderCellContainer
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
  width: PropTypes.string.isRequired,
  className: PropTypes.string,
  indentation: PropTypes.number,
  children: PropTypes.node
};

export { HeaderCell };
