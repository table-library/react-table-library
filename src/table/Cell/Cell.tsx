import * as React from 'react';
import cs from 'clsx';
/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';

import { CellContainer } from '@table-library/react-table-library/common/components/Cell';
import { ThemeContext } from '@table-library/react-table-library/common/context/Theme';

import { CellProps } from '@table-library/react-table-library/types/table';

export const Cell: React.FC<CellProps> = ({
  className,
  hide,
  pinLeft,
  pinRight,
  stiff,
  onClick,
  children,
  ...rest
}: CellProps) => {
  const theme = React.useContext(ThemeContext);

  return (
    <CellContainer
      role="gridcell"
      data-table-library_td=""
      css={css`
        ${theme?.BaseCell}
        ${theme?.Cell}
      `}
      className={cs('td', className, {
        stiff,
        hide,
        'pin-left': pinLeft,
        'pin-right': pinRight,
      })}
      onClick={onClick}
      {...rest}
    >
      <div>{children}</div>
    </CellContainer>
  );
};
