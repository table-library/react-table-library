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

import { HeaderCellProps } from '@table-library/react-table-library/types/table';
import { Nullish } from '@table-library/react-table-library/types/common';

const getPreservedColumn = (index: number, preservedDataColumns: DataColumn[]) => {
  const findPreservedDataColumn = (dataColumn: DataColumn) => dataColumn.index === index;
  const preservedDataColumn = preservedDataColumns.find(findPreservedDataColumn)!;

  return preservedDataColumn;
};

const useUpdateLayout = (index: number, hide: boolean | Nullish) => {
  const context = React.useContext(LayoutContext);

  if (!context) {
    throw new Error('No Layout Context.');
  }

  const { layout, tableElementRef, tableMemoryRef } = context;

  React.useLayoutEffect(() => {
    const preservedDataColumns = tableMemoryRef.current!.dataColumns;
    const dataColumns = getHeaderColumns(tableElementRef).map(toDataColumn);
    const thisPreservedDataColumn = getPreservedColumn(index, preservedDataColumns);

    const hideStatusDidNotChange = thisPreservedDataColumn?.isHide === !!hide;
    if (!preservedDataColumns?.length || hideStatusDidNotChange) return;

    const visibleDataColumns = dataColumns.filter((dataColumn) => !dataColumn.isHide);

    const getPartialResizedLayout = (dataColumn: DataColumn) => {
      if (dataColumn.isStiff || layout?.horizontalScroll) {
        const preservedDataColumn = getPreservedColumn(dataColumn.index, preservedDataColumns);

        return `${preservedDataColumn.width || preservedDataColumn.minWidth * 2}px`;
      } else {
        return 'minmax(0px, 1fr)';
      }
    };

    const resizedLayout = visibleDataColumns.map(getPartialResizedLayout).join(' ');

    setResizedLayout(resizedLayout, tableElementRef, tableMemoryRef);
    propagateResizedLayout(resizedLayout, layout);

    const newPreservedDataColumns = getHeaderColumns(tableElementRef).map(toDataColumn);
    tableMemoryRef.current!.dataColumns = newPreservedDataColumns;
  }, [index, hide, layout, tableElementRef, tableMemoryRef]);
};

export const HeaderCell: React.FC<HeaderCellProps> = ({
  index,
  className,
  hide,
  pinLeft,
  pinRight,
  stiff,
  colSpan = 0,
  previousColSpans = 0,
  resize,
  role = 'columnheader',
  children,
  style,
  ...rest
}: HeaderCellProps) => {
  const theme = React.useContext(ThemeContext);

  useUpdateLayout(index!, hide);

  const { cellRef, resizeRef } = useResize(index!, hide);

  let colSpanStyle = {};
  if (colSpan) {
    colSpanStyle = {
      ...colSpanStyle,
      'grid-column': `span ${colSpan} / ${index + colSpan + previousColSpans + 1}`,
    };
  }

  return (
    <>
      <HeaderCellContainer
        role={role}
        data-table-library_th=""
        data-hide={!!hide}
        data-resize-min-width={
          typeof resize === 'boolean' || resize?.minWidth == null ? 75 : resize.minWidth
        }
        style={{ ...colSpanStyle, ...style }}
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
        {resize && !hide && (
          <div className="resizer-area" ref={resizeRef} css={resizerStyle(resize).area}>
            <span className="resizer-handle" css={resizerStyle(resize).handle} />
          </div>
        )}
      </HeaderCellContainer>

      {/* column grouping */}
      {Array.from({ length: colSpan - 1 }, () => (
        <HeaderCellContainer className={cs('th', 'hide', 'colspan')} />
      ))}
    </>
  );
};
