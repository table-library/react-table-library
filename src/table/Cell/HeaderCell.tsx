import * as React from 'react';
import cs from 'clsx';
/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';

import { HeaderCellContainer } from '@table-library/react-table-library/common/components/Cell';
import { ThemeContext } from '@table-library/react-table-library/common/context/Theme';
import { resizerStyle } from '@table-library/react-table-library/resize/styles';
import { useResize } from '@table-library/react-table-library/resize/useResize';

import { HeaderCellProps } from '@table-library/react-table-library/types/table';

export const HeaderCell: React.FC<HeaderCellProps> = ({
  index,
  hideKey,
  className,
  hide,
  pinLeft,
  pinRight,
  stiff,
  resize,
  role = 'columnheader',
  children,
  ...rest
}: HeaderCellProps) => {
  const theme = React.useContext(ThemeContext);

  const cellRef = React.useRef<HTMLDivElement>(null);
  const { resizeRef } = useResize(cellRef, index!);

  return (
    <HeaderCellContainer
      role={role}
      data-table-library_th=""
      data-cell-key={hideKey || index}
      data-resize-min-width={
        typeof resize === 'boolean' || resize?.minWidth == null ? 75 : resize.minWidth
      }
      css={css`
        ${theme?.BaseCell}
        ${theme?.HeaderCell}
      `}
      className={cs('th', className, {
        stiff,
        resize,
        'pin-left': pinLeft,
        'pin-right': pinRight,
      })}
      ref={cellRef}
      {...rest}
    >
      <div>{children}</div>
      {resize && <span ref={resizeRef} css={resizerStyle(resize)} />}
    </HeaderCellContainer>
  );
};
