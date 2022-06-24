import * as React from 'react';
import cs from 'clsx';
/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';

import { HeaderCellContainer } from '@table-library/react-table-library/common/components/Cell';
import { ThemeContext } from '@table-library/react-table-library/common/context/Theme';
import { LayoutContext } from '@table-library/react-table-library/common/context';
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

  const previousHide = React.useRef(hide);

  React.useLayoutEffect(() => {
    if (previousHide.current === hide) return;
    previousHide.current = hide;

    const dataColumns = getHeaderColumns(tableElementRef).map(toDataColumn);
    const visibleDataColumns = dataColumns.filter((dataColumn) => !dataColumn.isHide);

    // read
    const maybeSpace = tableMemoryRef.current!.hiddenSpacesInMemory[index];

    const getPixel = (dataColumn: DataColumn) => {
      if (dataColumn.index === index) {
        return maybeSpace || dataColumn.minWidth * 2; // TODO: could be a configuration like hide={boolean | enabled, minWidth}
      } else {
        return dataColumn.width;
      }
    };

    const getPercentage = (dataColumn: DataColumn) => {
      if (dataColumn.isStiff) {
        return `${dataColumn.width}px`;
      } else {
        return 'minmax(0px, 1fr)';
        // return 100 / visibleDataColumns.length;
      }
    };

    const resizedLayout = visibleDataColumns
      .map((dataColumn: DataColumn) =>
        layout?.horizontalScroll ? `${getPixel(dataColumn)}px` : `${getPercentage(dataColumn)}`,
      )
      .join(' ');

    const didChange = resizedLayout !== tableElementRef.current!.style.gridTemplateColumns;

    tableElementRef.current!.style.setProperty(
      '--data-table-library_grid-template-columns',
      resizedLayout,
    );

    applyProgrammaticHide(tableElementRef, dataColumns);

    // store
    if (hide) {
      tableMemoryRef.current!.hiddenSpacesInMemory[index] = dataColumns[index].width;
    } else {
      delete tableMemoryRef.current!.hiddenSpacesInMemory[index];
    }

    if (layout?.onLayoutChange && didChange && resizedLayout !== '') {
      layout?.onLayoutChange(resizedLayout);
    }
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
