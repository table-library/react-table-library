import * as React from 'react';
import { VariableSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

import { Header, Body, TableNode } from '@overmap-ai/react-table-library/table/index';
import {
  getRowHeight,
  SHARED_VIRTUALIZE_STYLE,
} from '@overmap-ai/react-table-library/common/util/virtualized';

import { VirtualizedProps } from '@overmap-ai/react-table-library/types/virtualized';

const Virtualized = <T extends TableNode>({
  tableList,
  rowHeight,
  header,
  body,
  tableOptions,
  rowOptions,
}: VirtualizedProps<T>) => {
  return (
    <>
      {tableOptions?.renderBeforeTable && tableOptions.renderBeforeTable()}
      <AutoSizer>
        {({ width, height }) => (
          <VariableSizeList
            height={height}
            width={width}
            itemCount={tableList.length}
            itemSize={(index) => getRowHeight(rowHeight, tableList[index], index)}
            innerElementType={React.forwardRef(({ children, ...rest }, ref) => (
              <div ref={ref} {...rest}>
                <div
                  style={{
                    ...SHARED_VIRTUALIZE_STYLE,
                    position: 'sticky',
                    insetBlockStart: 0,
                    zIndex: 3,
                  }}
                >
                  <Header>{header()}</Header>
                </div>

                <Body>{children}</Body>
              </div>
            ))}
            itemData={{ items: tableList }}
          >
            {({ index, style, data }) => (
              <div
                style={{
                  ...style,
                  ...SHARED_VIRTUALIZE_STYLE,
                  top: +(style.top || 0) + getRowHeight(rowHeight, data.items[index], index),
                }}
              >
                {rowOptions?.renderBeforeRow &&
                  rowOptions.renderBeforeRow(data.items[index], index)}
                {body(data.items[index], index)}
                {rowOptions?.renderAfterRow && rowOptions.renderAfterRow(data.items[index], index)}
              </div>
            )}
          </VariableSizeList>
        )}
      </AutoSizer>
      {tableOptions?.renderAfterTable && tableOptions.renderAfterTable()}
    </>
  );
};

export { Virtualized, getRowHeight };
