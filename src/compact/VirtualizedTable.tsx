import * as React from 'react';
import { VariableSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

import { Body } from '@table-library/react-table-library/table/index';
import {
  SHARED_VIRTUALIZE_STYLE,
  getRowHeight,
} from '@table-library/react-table-library/common/util/virtualized';

import {
  CompactTableProps,
  VirtualizedTableProps,
  InternalsObject,
  Internals,
} from '@table-library/react-table-library/types/compact';

import { CompactHeader } from './CompactHeader';
import { CompactRow } from './CompactRow';

const withStickyHeader = ({ columns, ...tableProps }: CompactTableProps) => {
  return React.forwardRef(({ children, ...rest }, ref) => (
    // @ts-ignore
    <div ref={ref} {...rest}>
      <div
        style={{
          ...SHARED_VIRTUALIZE_STYLE,
          position: 'sticky',
          insetBlockStart: 0,
          zIndex: 3,
        }}
      >
        <CompactHeader columns={columns} {...tableProps} />
      </div>

      <Body>{children}</Body>
    </div>
  ));
};

type VirtualizedRowProps = InternalsObject & CompactTableProps;

const VirtualizedRow: React.FC<VirtualizedRowProps> = ({
  internals,
  columns,
  rowProps,
  rowOptions,
  virtualizedOptions,
  ...tableProps
}: VirtualizedRowProps) => {
  const { index, style, data } = internals;
  const item = data.items[index];

  const rowHeight = getRowHeight(virtualizedOptions?.rowHeight, item, index);

  return (
    <div
      style={{
        ...style,
        ...SHARED_VIRTUALIZE_STYLE,
        top: style.top + rowHeight,
      }}
    >
      <CompactRow
        item={item}
        columns={columns}
        rowProps={rowProps}
        rowOptions={rowOptions}
        {...tableProps}
      />
    </div>
  );
};

export const VirtualizedTable: React.FC<VirtualizedTableProps> = ({
  tableList,
  columns,
  rowProps = {},
  rowOptions,
  virtualizedOptions,
  ...tableProps
}: VirtualizedTableProps) => {
  return (
    <AutoSizer>
      {({ width, height }: { width: any; height: any }) => (
        <VariableSizeList
          height={height}
          width={width}
          itemCount={virtualizedOptions?.itemCount || tableList.length}
          itemSize={(index: number) =>
            getRowHeight(virtualizedOptions?.rowHeight, tableList[index], index)
          }
          innerElementType={withStickyHeader({ columns, ...tableProps })}
          itemData={{ items: tableList }}
        >
          {(internals: Internals) => (
            <VirtualizedRow
              internals={internals}
              columns={columns}
              rowProps={rowProps}
              rowOptions={rowOptions}
              virtualizedOptions={virtualizedOptions}
              {...tableProps}
            />
          )}
        </VariableSizeList>
      )}
    </AutoSizer>
  );
};
