import * as React from 'react';

import {
  Table,
  Header,
  HeaderRow,
  Body,
  Row,
  HeaderCell,
  Cell,
  TableProps,
} from '@table-library/react-table-library/table/index';

import { useTheme } from '@table-library/react-table-library/theme/index';

import { TableNode, RowPropsAsObject } from '@table-library/react-table-library/types/table';
import { Theme } from '@table-library/react-table-library/types/theme';
import { ColumnSortProps } from '@table-library/react-table-library/types/sort';
import { ColumnTreeProps } from '@table-library/react-table-library/types/tree';
import { ColumnResizeProps } from '@table-library/react-table-library/types/resize';

const FULL_HEIGHT_THEME = {
  Table: `
    height: 100%;
  `,
};

export type Column = {
  label: string;
  renderCell: (node: TableNode) => React.ReactNode;
  // features
  resize?: ColumnResizeProps;
  sort?: ColumnSortProps;
  select?: boolean;
  tree?: ColumnTreeProps;
  pin?: boolean;
};

export type RowOptions = {
  renderBeforeRow?: (node: TableNode) => React.ReactNode;
  renderAfterRow?: (node: TableNode) => React.ReactNode;
};

const countPriorCheckboxes = (columns: Column[], column: Column) => {
  const index = columns.indexOf(column);
  const priorColumns = index > -1 ? columns.slice(0, index + 1) : [];
  const priorCheckboxes = priorColumns.filter((priorColumn: Column) => priorColumn.select);
  return priorCheckboxes.length;
};

export type CompactTableProps = TableProps & {
  columns: Column[];
  rowProps?: RowPropsAsObject;
  rowOptions?: RowOptions;
};

const CompactTable = React.forwardRef(
  ({ columns, rowProps = {}, rowOptions, ...tableProps }: CompactTableProps, ref: any) => {
    const {
      data,
      theme: customTheme,
      layout,
      sort,
      pagination,
      select,
      tree,
      onInit = () => {},
    } = tableProps;

    let allThemes: Theme[] = [];
    if (layout?.fullHeight) {
      allThemes = allThemes.concat(FULL_HEIGHT_THEME);
    }
    if (customTheme) {
      allThemes = allThemes.concat(customTheme);
    }

    const theme = useTheme(allThemes);

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
        {(tableList) => (
          <>
            <Header>
              <HeaderRow>
                {columns.map((column, index) => {
                  // select feature

                  let checkbox = null;
                  if (select && column.select) {
                    checkbox = <select.components.HeaderCellSelect />;
                  }

                  const sharedProps = {
                    index: index + countPriorCheckboxes(columns, column),
                    resize: column.resize,
                    pin: column.pin,
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

            <Body>
              {tableList.map((item) => {
                return (
                  <React.Fragment key={item.id}>
                    {rowOptions?.renderBeforeRow && rowOptions.renderBeforeRow(item)}

                    <Row item={item} {...rowProps}>
                      {columns.map((column, index) => {
                        const sharedProps = {
                          pin: column.pin,
                        };

                        let cell = null;
                        if (tree && column.tree) {
                          let extraProps = {};
                          if (typeof column.tree !== 'boolean') {
                            extraProps = { ...extraProps, treeIcon: column.tree.treeIcon };
                          }

                          cell = (
                            <tree.components.CellTree item={item} {...sharedProps} {...extraProps}>
                              {column.renderCell(item)}
                            </tree.components.CellTree>
                          );
                        } else {
                          cell = <Cell {...sharedProps}>{column.renderCell(item)}</Cell>;
                        }

                        // select feature

                        let checkbox = null;
                        if (select && column.select) {
                          checkbox = <select.components.CellSelect item={item} />;
                        }

                        return (
                          <React.Fragment key={index}>
                            {checkbox}
                            {cell}
                          </React.Fragment>
                        );
                      })}
                    </Row>

                    {rowOptions?.renderAfterRow && rowOptions.renderAfterRow(item)}
                  </React.Fragment>
                );
              })}
            </Body>
          </>
        )}
      </Table>
    );
  },
);

export { CompactTable };
