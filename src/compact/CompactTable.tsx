import * as React from 'react';

import { Table } from '@overmap-ai/react-table-library/table/index';

import { TableNode } from '@overmap-ai/react-table-library/types/table';
import { CompactTableProps, Column } from '@overmap-ai/react-table-library/types/compact';

import { VirtualizedTable } from './VirtualizedTable';
import { NormalTable } from './NormalTable';
import { CompactFooter } from './CompactFooter';

export const CompactTable = React.forwardRef(
  <T extends TableNode>(
    {
      columns,
      rowProps = {},
      tableOptions,
      rowOptions,
      virtualizedOptions,
      ...tableProps
    }: CompactTableProps<T>,
    ref: any,
  ) => {
    const { data, theme, layout, sort, pagination, select, tree, onInit = () => {} } = tableProps;

    return (
      <Table
        ref={ref}
        data={data}
        theme={theme}
        layout={layout}
        sort={sort}
        pagination={pagination}
        select={select}
        tree={tree}
        onInit={onInit}
      >
        {(tableList: T[]) => (
          <React.Fragment>
            {tableOptions?.renderBeforeTable && tableOptions.renderBeforeTable()}
            {virtualizedOptions ? (
              <VirtualizedTable
                tableList={tableList}
                columns={columns}
                rowProps={rowProps}
                rowOptions={rowOptions}
                virtualizedOptions={virtualizedOptions}
                {...tableProps}
              />
            ) : (
              <NormalTable
                tableList={tableList}
                columns={columns}
                rowProps={rowProps}
                rowOptions={rowOptions}
                {...tableProps}
              />
            )}
            {columns.some((column: Column<T>) => !!column.footer) && (
              <CompactFooter columns={columns} />
            )}
            {tableOptions?.renderAfterTable && tableOptions.renderAfterTable()}
          </React.Fragment>
        )}
      </Table>
    );
  },
);
