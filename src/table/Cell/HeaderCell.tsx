import * as React from 'react';
import cs from 'clsx';
/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';

import { HeaderCellContainer } from '@table-library/react-table-library/common/components/Cell';
import { ThemeContext } from '@table-library/react-table-library/common/context/Theme';
import {
  LayoutContext,
  propagateResizedLayout,
  setResizedLayout,
} from '@table-library/react-table-library/common/context';
import { resizerStyle } from '@table-library/react-table-library/resize/styles';
import { useResize } from '@table-library/react-table-library/resize/useResize';
import {
  DataColumn,
  toDataColumn,
  getHeaderColumns,
} from '@table-library/react-table-library/common/util/columns';

import { Data, HeaderCellProps } from '@table-library/react-table-library/types/table';
import { Nullish } from '@table-library/react-table-library/types/common';

const useUpdateLayout = (index: number, hide: boolean | Nullish) => {
  const context = React.useContext(LayoutContext);

  if (!context) {
    throw new Error('No Layout Context.');
  }

  const { layout, tableElementRef, tableMemoryRef } = context;

  React.useLayoutEffect(() => {
    const preservedDataColumns = tableMemoryRef.current!.dataColumns;
    const dataColumns = getHeaderColumns(tableElementRef).map(toDataColumn);

    if (!preservedDataColumns?.length) return;

    const visibleDataColumns = dataColumns.filter((dataColumn) => !dataColumn.isHide);

    const getPartialResizedLayout = (dataColumn: DataColumn) => {
      if (dataColumn.isStiff || layout?.horizontalScroll) {
        const findPreservedDataColumn = (value: DataColumn) => value.index === dataColumn.index;
        const preservedDataColumn = preservedDataColumns.find(findPreservedDataColumn)!;

        return `${preservedDataColumn.width || preservedDataColumn.minWidth * 2}px`;
      } else {
        return 'minmax(0px, 1fr)';
      }
    };

    const resizedLayout = visibleDataColumns.map(getPartialResizedLayout).join(' ');

    setResizedLayout(resizedLayout, tableElementRef);
    propagateResizedLayout(resizedLayout, layout);
  }, [index, hide, layout, tableElementRef, tableMemoryRef]);
};

export const HeaderCell: React.FC<HeaderCellProps> = ({
  index,
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

  useUpdateLayout(index!, hide);

  const { cellRef, resizeRef } = useResize(index!, hide);

  return (
    <HeaderCellContainer
      role={role}
      data-table-library_th=""
      data-hide={!!hide}
      data-resize-min-width={
        typeof resize === 'boolean' || resize?.minWidth == null ? 75 : resize.minWidth
      }
      css={css`
        ${theme?.BaseCell}
        ${theme?.HeaderCell}
      `}
      className={cs('th', className, {
        stiff,
        hide,
        resize,
        'pin-left': pinLeft,
        'pin-right': pinRight,
      })}
      ref={cellRef}
      {...rest}
    >
      <div>{children}</div>
      {resize && !hide && <span ref={resizeRef} css={resizerStyle(resize)} />}
    </HeaderCellContainer>
  );
};
