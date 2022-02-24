import * as React from 'react';
import cs from 'clsx';

import { HeaderCellContainer } from '@table-library/react-table-library/common/components/Cell';
import { ThemeContext } from '@table-library/react-table-library/common/context/Theme';
import { resizerStyle } from '@table-library/react-table-library/resize/styles';
import { useResize } from '@table-library/react-table-library/resize/useResize';

import { HeaderCellProps } from '@table-library/react-table-library/types/table';

const HeaderCell = ({
  index,
  hideKey,
  className,
  hide,
  pin,
  stiff,
  resize,
  children,
  ...rest
}: HeaderCellProps) => {
  const theme = React.useContext(ThemeContext);

  const cellRef = React.useRef<HTMLDivElement>(null);
  const { resizeRef } = useResize(cellRef, index!);

  return (
    <HeaderCellContainer
      {...rest}
      role="columnheader"
      data-cell-key={hideKey || index}
      data-resize-min-width={
        typeof resize === 'boolean' || resize?.minWidth == null ? 75 : resize.minWidth
      }
      className={cs('th', className, {
        stiff,
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

export { HeaderCell };
