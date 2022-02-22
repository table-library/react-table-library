/* eslint-disable react/prop-types */
import * as React from 'react';

import { Header, HeaderRow, HeaderCell } from '@table-library/react-table-library/table/index';

import { CompactTableProps, Column } from '@table-library/react-table-library/types/compact';

const countPriorCheckboxes = (columns: Column[], column: Column) => {
  const index = columns.indexOf(column);
  const priorColumns = index > -1 ? columns.slice(0, index + 1) : [];
  const priorCheckboxes = priorColumns.filter((priorColumn: Column) => priorColumn.select);
  return priorCheckboxes.length;
};

const CompactHeader = ({ columns, ...tableProps }: CompactTableProps) => {
  const { sort, select } = tableProps;

  return (
    <Header>
      <HeaderRow>
        {columns.map((column: Column, index: number) => {
          // select feature

          let checkbox = null;
          if (select && column.select) {
            checkbox = <select.components.HeaderCellSelect />;
          }

          const sharedProps = {
            index: index + countPriorCheckboxes(columns, column),
            resize: column.resize,
            pin: column.pin,
            hideKey: column.hide?.hideKey,
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

export { CompactHeader };
