import * as React from 'react';
import cs from 'clsx';
/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';

import { CellContainer } from '@table-library/react-table-library/common/components/Cell';
import { ThemeContext } from '@table-library/react-table-library/common/context/Theme';

import { CellProps } from '@table-library/react-table-library/types/table';

export const Cell: React.FC<CellProps> = ({
  index,
  className,
  hide,
  pinLeft,
  pinRight,
  stiff,
  colSpan = 0,
  previousColSpans = 0,
  onClick,
  children,
  style,
  ...rest
}: CellProps) => {
  const theme = React.useContext(ThemeContext);

  let colSpanStyle = {};
  if (colSpan) {
    colSpanStyle = {
      ...colSpanStyle,
      'grid-column': `span ${colSpan} / ${index + colSpan + previousColSpans + 1}`,
    };
  }

  return (
    <>
      <CellContainer
        role="gridcell"
        data-table-library_td=""
        style={{ ...colSpanStyle, ...style }}
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

      {/* column grouping */}
      {Array.from({ length: colSpan - 1 }, () => (
        <CellContainer className={cs('td', 'hide', 'colspan')} />
      ))}
    </>
  );
};
