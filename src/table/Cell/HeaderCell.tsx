import * as React from 'react';
import cs from 'classnames';

import { HeaderCellContainer } from '@table-library/react-table-library/common/components/Cell';
import { ThemeContext } from '@table-library/react-table-library/common/context/Theme';
import { resizerStyle } from '@table-library/react-table-library/resize/styles';
import { useResize } from '@table-library/react-table-library/resize/useResize';

import { ResizeProp } from '@table-library/react-table-library/types/resize';

interface CellProps {
  index: number;
  cellKey?: string;
  className?: string;
  hide?: boolean;
  pin?: boolean;
  stiff?: boolean;
  resize?: ResizeProp;
  children: React.ReactNode;
}

const HeaderCell = ({
  index,
  cellKey,
  className,
  hide,
  pin,
  stiff,
  resize,
  children,
  ...rest
}: CellProps & Record<string, any>) => {
  const theme = React.useContext(ThemeContext);

  const cellRef = React.useRef<HTMLDivElement>(null);
  const { resizeRef } = useResize(cellRef, index);

  return (
    <HeaderCellContainer
      {...rest}
      role="columnheader"
      data-cell-key={cellKey || index}
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
