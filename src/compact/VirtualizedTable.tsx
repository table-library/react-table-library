import * as React from 'react';
import { VariableSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

import { Body } from '@table-library/react-table-library/table/index';

import { TableNode } from '@table-library/react-table-library/types/table';
import { Nullish } from '@table-library/react-table-library/types/common';
import {
  CompactTableProps,
  VirtualizedTableProps,
  VirtualizedOptions,
  InternalsObject,
  Internals,
} from '@table-library/react-table-library/types/compact';

import { CompactHeader } from './CompactHeader';
import { CompactRow } from './CompactRow';

const getRowHeight = (
  virtualizedOptions: VirtualizedOptions | Nullish,
  item: TableNode,
  index: number,
) => {
  let rowHeight = 0;
  if (virtualizedOptions?.rowHeight) {
    if (typeof virtualizedOptions?.rowHeight === 'number') {
      rowHeight = virtualizedOptions.rowHeight;
    }

    if (typeof virtualizedOptions?.rowHeight === 'function') {
      rowHeight = virtualizedOptions?.rowHeight(item, index);
    }
  }

  return rowHeight;
};

const withStickyHeader = ({ columns, ...tableProps }: CompactTableProps) => {
  return React.forwardRef(({ children, ...rest }, ref) => (
    // @ts-ignore
    <div ref={ref} {...rest}>
      <CompactHeader columns={columns} {...tableProps} />

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

  const rowHeight = getRowHeight(virtualizedOptions, item, index);

  return (
    <div
      style={{
        ...style,
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
          itemSize={(index: number) => getRowHeight(virtualizedOptions, tableList[index], index)}
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
