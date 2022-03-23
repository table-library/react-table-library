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
      {...rest}
      role="gridcell"
      className={cs('td', className, {
        stiff,
        'pin-left': pinLeft,
        'pin-right': pinRight,
      })}
      css={css`
        ${theme?.BaseCell}
        ${theme?.Cell}
      `}
      onClick={onClick}
    >
      <div>{children}</div>
    </CellContainer>
  );
};
