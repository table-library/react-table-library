import * as React from 'react';
import PropTypes from 'prop-types';
import { css } from 'styled-components';
import cs from 'classnames';

import { HeaderCellContainer } from '@table-library/react-table-library/common/components/Cell';
import { ThemeContext } from '@table-library/react-table-library/common/context/Theme';
import {
  Resizer,
  useResize,
} from '@table-library/react-table-library/resize';

const HeaderCell = ({
  index,
  className,
  hide,
  shrink,
  resize,
  children,
}) => {
  const theme = React.useContext(ThemeContext);

  const { resizeRef, cellRef } = useResize(index);

  return (
    <HeaderCellContainer
      role="columnheader"
      className={cs('th', className, { hide, shrink })}
      css={css`
        ${theme?.BaseCell}
        ${theme?.HeaderCell}
      `}
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
  hide: PropTypes.bool,
  shrink: PropTypes.bool,
  resize: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func,
  ]),
};

export { HeaderCell };
