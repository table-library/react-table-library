import * as React from 'react';
import PropTypes from 'prop-types';
import { css } from 'styled-components';
import cs from 'classnames';

import { HeaderCellContainer } from '@table-library/react-table-library/lib/common/components/Cell';
import { ThemeContext } from '@table-library/react-table-library/lib/common/context/Theme';
import {
  Resizer,
  useResize
} from '@table-library/react-table-library/lib/resize';

const HeaderCell = ({
  index,
  className,
  indentation,
  hide,
  shrink,
  resize,
  children
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
  hide: PropTypes.bool,
  shrink: PropTypes.bool,
  resize: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func
  ])
};

export { HeaderCell };
