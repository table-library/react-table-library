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
  applyProgrammaticHide,
  getHeaderColumns,
} from '@table-library/react-table-library/common/util/columns';

import { HeaderCellProps } from '@table-library/react-table-library/types/table';
import { Nullish } from '@table-library/react-table-library/types/common';

const useUpdateLayout = (index: number, hide: boolean | Nullish) => {
  const context = React.useContext(LayoutContext);

  if (!context) {
    throw new Error('No Layout Context.');
  }

  const { layout, tableElementRef, tableMemoryRef } = context;

  React.useLayoutEffect(() => {
    const isVirtualized = !!tableElementRef.current!.querySelector(
      '[data-table-library_virtualized=""]',
    );

    const dataColumnsFromBeforeReRender = tableMemoryRef.current!.dataColumns;
    const dataColumns = getHeaderColumns(tableElementRef).map(toDataColumn);

    if (!dataColumnsFromBeforeReRender?.length) return;

    const getWidth = (dataColumn: DataColumn) => {
      if (isVirtualized) {
        return dataColumnsFromBeforeReRender.find(
          (dataColumnFrom) => dataColumnFrom.index === dataColumn.index,
        )?.width;
      } else {
        return dataColumn.width;
      }
    };

    const visibleDataColumns = dataColumns.filter((dataColumn) => !dataColumn.isHide);

    const getPixel = (dataColumn: DataColumn) => {
      if (dataColumn.index === index) {
        const maybeSpace = tableMemoryRef.current!.hiddenSpacesInMemory[dataColumn.index];
        return maybeSpace || dataColumn.minWidth * 2; // TODO: could be a configuration like hide={boolean | enabled, minWidth}
      } else {
        // return dataColumn.width;
        return getWidth(dataColumn);
      }
    };

    console.log(index, tableMemoryRef.current!.hiddenSpacesInMemory);

    const getPercentage = (dataColumn: DataColumn) => {
      if (dataColumn.isStiff) {
        // return `${dataColumn.width}px`;
        const maybeSpace = tableMemoryRef.current!.hiddenSpacesInMemory[dataColumn.index];
        return maybeSpace ? `${maybeSpace}px` : `${getWidth(dataColumn)}px`;
      } else {
        return 'minmax(0px, 1fr)';
      }
    };

    const resizedLayout = visibleDataColumns
      .map((dataColumn: DataColumn) =>
        layout?.horizontalScroll ? `${getPixel(dataColumn)}px` : getPercentage(dataColumn),
      )
      .join(' ');

    console.log('HeaderCell');
    setResizedLayout(resizedLayout, tableElementRef);
    propagateResizedLayout(resizedLayout, layout);

    applyProgrammaticHide(tableElementRef, dataColumns);

    // store
    // check if 0, because it runs for all HeaderCell
    const width = getWidth(dataColumns[index]);
    if (hide && width) tableMemoryRef.current!.hiddenSpacesInMemory[index] = width;
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
