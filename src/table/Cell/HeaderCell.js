import * as React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';

import { HeaderCellContainer } from '@table-library/react-table-library/common/components/Cell';
import { ThemeContext } from '@table-library/react-table-library/common/context/Theme';
import {
  resizerStyle,
  useResize,
  useLayoutHide,
  useStyleHide,
} from '@table-library/react-table-library/resize';

const HeaderCell = ({
  index,
  className,
  hide,
  pin,
  fixed,
  resize,
  children,
  ...rest
}) => {
  const theme = React.useContext(ThemeContext);

  const cellRef = React.useRef();
  useLayoutHide(index, hide);
  useStyleHide(cellRef, hide);

  const { resizeRef } = useResize(cellRef, index);

  return (
    <HeaderCellContainer
      {...rest}
      role="columnheader"
      data-resize-min-width={resize?.minWidth || 75}
      className={cs('th', className, {
        fixed,
        resize,
        pin,
      })}
      css={`
        ${theme?.BaseCell}
        ${theme?.HeaderCell}
      `}
      ref={cellRef}
    >
      <div>{children}</div>
      {resize && <span ref={resizeRef} css={resizerStyle(resize)} />}
    </HeaderCellContainer>
  );
};

HeaderCell.propTypes = {
  index: PropTypes.number,
  className: PropTypes.string,
  hide: PropTypes.bool,
  pin: PropTypes.bool,
  fixed: PropTypes.bool,
  resize: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      minWidth: PropTypes.number,
    }),
  ]),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func,
  ]),
};

export { HeaderCell };
