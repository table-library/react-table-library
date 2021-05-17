import * as React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';

import { HeaderCellContainer } from '@table-library/react-table-library/common/components/Cell';
import { ThemeContext } from '@table-library/react-table-library/common/context/Theme';
import {
  resizerStyle,
  useResize,
} from '@table-library/react-table-library/resize';

const HeaderCell = ({
  index,
  className,
  hide,
  shrink,
  resize,
  children,
  ...rest
}) => {
  const theme = React.useContext(ThemeContext);

  const { resizeRef, cellRef } = useResize(index, resize);

  return (
    <HeaderCellContainer
      {...rest}
      role="columnheader"
      className={cs('th', className, { hide, shrink })}
      css={`
        ${theme?.BaseCell}
        ${theme?.HeaderCell}
      `}
      ref={cellRef}
    >
      <div>{children}</div>
      {resize && <span ref={resizeRef} css={resizerStyle()} />}
    </HeaderCellContainer>
  );
};

HeaderCell.propTypes = {
  index: PropTypes.number,
  className: PropTypes.string,
  hide: PropTypes.bool,
  shrink: PropTypes.bool,
  resize: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      minWidth: PropTypes.number,
      offset: PropTypes.number,
    }),
  ]),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func,
  ]),
};

export { HeaderCell };
