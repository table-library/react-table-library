import * as React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';

import { HeaderCellContainer } from '@shared';
import { ThemeContext } from '@context';
import { Resizer, useResize } from '@resize';

const HeaderCell = ({ index, className, indentation, children }) => {
  const theme = React.useContext(ThemeContext);

  const { resize, resizeRef, cellRef } = useResize(index);

  return (
    <HeaderCellContainer
      role="columnheader"
      className={cs('th', className)}
      css={theme?.HeaderCell}
      indentation={indentation}
      ref={cellRef}
    >
      <div>{children}</div>
      {resize && <Resizer ref={resizeRef} />}
    </HeaderCellContainer>
  );
};

HeaderCell.propTypes = {
  index: PropTypes.number,
  className: PropTypes.string,
  indentation: PropTypes.number,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func
  ])
};

export { HeaderCell };
