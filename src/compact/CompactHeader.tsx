import * as React from 'react';

import {
  Header,
  HeaderRow,
  HeaderCell,
  TableNode,
} from '@overmap-ai/react-table-library/table/index';

import { CompactTableProps, Column } from '@overmap-ai/react-table-library/types/compact';

const countPriorCheckboxes = <T extends TableNode>(columns: Column<T>[], column: Column<T>) => {
  const index = columns.indexOf(column);
  const priorColumns = index > -1 ? columns.slice(0, index + 1) : [];
  const priorCheckboxes = priorColumns.filter((priorColumn: Column<T>) => priorColumn.select);
  return priorCheckboxes.length;
};

export const CompactHeader = <T extends TableNode>({
  columns,
  ...tableProps
}: CompactTableProps<T>) => {
  const { sort, select } = tableProps;

  return (
    <Header>
      <HeaderRow>
        {columns.map((column: Column<T>, index: number) => {
          // select feature

          let checkbox = null;
          if (select && column.select) {
            checkbox =
              typeof column.select !== 'boolean' && column.select.renderHeaderCellSelect ? (
                <HeaderCell stiff>{column.select.renderHeaderCellSelect()}</HeaderCell>
              ) : (
                <select.components.HeaderCellSelect />
              );
          }

          const sharedProps = {
            index: index + countPriorCheckboxes<T>(columns, column),
            resize: column.resize,
            pinLeft: column.pinLeft,
            pinRight: column.pinRight,
            hide: column.hide,
          };

          // sort feature

          let cell = null;
          if (sort && column.sort && column.sort.sortKey) {
            cell = (
              <sort.components.HeaderCellSort
                {...sharedProps}
                sortKey={column.sort.sortKey}
                sortIcon={column.sort.sortIcon}
              >
                {column.label}
              </sort.components.HeaderCellSort>
            );
          } else {
            cell = <HeaderCell {...sharedProps}>{column.label}</HeaderCell>;
          }

          return (
            <React.Fragment key={index}>
              {checkbox}
              {cell}
            </React.Fragment>
          );
        })}
      </HeaderRow>
    </Header>
  );
};
