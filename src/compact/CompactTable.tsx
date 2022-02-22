/* eslint-disable react/prop-types */
import * as React from 'react';
import { VariableSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

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
import { Nullish } from '@table-library/react-table-library/types/common';
import { Theme } from '@table-library/react-table-library/types/theme';
import { ColumnSortProps } from '@table-library/react-table-library/types/sort';
import { ColumnTreeProps } from '@table-library/react-table-library/types/tree';
import { ColumnResizeProps } from '@table-library/react-table-library/types/resize';
import { ColumnHideProps } from '@table-library/react-table-library/types/hide';

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
  hide?: ColumnHideProps;
  cellProps?: Record<string, any>;
};

export type VirtualizedOptions = {
  rowHeight: number | ((item: TableNode, index: number) => number);
  itemCount?: number;
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

const evaluateProps = (props: Record<string, any>, item: TableNode) =>
  Object.keys(props).reduce((acc: Record<string, any>, key: string) => {
    if (typeof props[key] === 'function') {
      acc[key] = props[key](item);
    } else {
      acc[key] = props[key];
    }

    return acc;
  }, {});

export type CompactTableProps = TableProps & {
  columns: Column[];
  rowProps?: RowPropsAsObject;
  rowOptions?: RowOptions;
  virtualizedOptions?: VirtualizedOptions;
};

type NormalTableProps = CompactTableProps & {
  tableList: TableNode[];
};

type VirtualizedTableProps = CompactTableProps & {
  tableList: TableNode[];
};

const CompactHeader = ({ columns, ...tableProps }: CompactTableProps) => {
  const { sort, select } = tableProps;

  return (
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

const CompactRow = ({
  item,
  columns,
  rowProps,
  rowOptions,
  ...tableProps
}: { item: TableNode } & CompactTableProps) => {
  const { tree, select } = tableProps;

  return (
    <>
      {rowOptions?.renderBeforeRow && rowOptions.renderBeforeRow(item)}

      <Row item={item} {...rowProps}>
        {columns.map((column, index) => {
          const sharedProps = {
            pin: column.pin,
          };

          const evaluatedCellProps = evaluateProps(column?.cellProps || {}, item);

          let cell = null;
          if (tree && column.tree) {
            let featureProps = {};
            if (typeof column.tree !== 'boolean') {
              featureProps = { ...featureProps, treeIcon: column.tree.treeIcon };
            }

            cell = (
              <tree.components.CellTree
                item={item}
                {...evaluatedCellProps}
                {...sharedProps}
                {...featureProps}
              >
                {column.renderCell(item)}
              </tree.components.CellTree>
            );
          } else {
            cell = (
              <Cell {...evaluatedCellProps} {...sharedProps}>
                {column.renderCell(item)}
              </Cell>
            );
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
    </>
  );
};

const NormalTable = ({
  tableList,
  columns,
  rowProps = {},
  rowOptions,
  ...tableProps
}: NormalTableProps) => {
  return (
    <>
      <CompactHeader columns={columns} {...tableProps} />

      <Body>
        {tableList.map((item) => (
          <CompactRow
            key={item.id}
            item={item}
            columns={columns}
            rowProps={rowProps}
            rowOptions={rowOptions}
            {...tableProps}
          />
        ))}
      </Body>
    </>
  );
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

type Internals = {
  index: number;
  style: any;
  data: { items: TableNode[] };
};

type InternalsObject = {
  internals: Internals;
};

const VirtualizedRow = ({
  internals,
  columns,
  rowProps,
  rowOptions,
  virtualizedOptions,
  ...tableProps
}: InternalsObject & CompactTableProps) => {
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

const VirtualizedTable = ({
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

const CompactTable = React.forwardRef(
  (
    { columns, rowProps = {}, rowOptions, virtualizedOptions, ...tableProps }: CompactTableProps,
    ref: any,
  ) => {
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
    if (layout?.fullHeight || virtualizedOptions) {
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
        {(tableList) =>
          virtualizedOptions ? (
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
          )
        }
      </Table>
    );
  },
);

export { CompactTable };
