import * as React from 'react';

import { TableNode, TableProps, RowProps } from '@overmap-ai/react-table-library/types/table';
import { RowHeight } from '@overmap-ai/react-table-library/types/virtualized';
import { ColumnSortProps } from '@table-library/react-table-library/types/sort';
import { ColumnSelectProps } from '@table-library/react-table-library/types/select';
import { ColumnTreeProps } from '@table-library/react-table-library/types/tree';
import { ColumnResizeProps } from '@table-library/react-table-library/types/resize';

// external

export type Column<T extends TableNode> = {
  label: string;
  renderCell: (node: T) => React.ReactNode;
  footer?: string;
  resize?: ColumnResizeProps;
  sort?: ColumnSortProps;
  select?: ColumnSelectProps;
  tree?: ColumnTreeProps<T>;
  pinLeft?: boolean;
  pinRight?: boolean;
  hide?: boolean;
  cellProps?: Record<string, any>;
};

export type VirtualizedOptions = {
  rowHeight: RowHeight;
  itemCount?: number;
};

export type TableOptions = {
  renderBeforeTable?: () => React.ReactNode;
  renderAfterTable?: () => React.ReactNode;
};

export type RowOptions<T extends TableNode> = {
  renderBeforeRow?: (node: T, index: number) => React.ReactNode;
  renderAfterRow?: (node: T, index: number) => React.ReactNode;
};

export type RowPropsAsObject<T extends TableNode> = Omit<RowProps<T>, 'item' | 'children'>;

export type CompactTableProps<T extends TableNode> = TableProps<T> & {
  columns: Column<T>[];
  tableOptions?: TableOptions;
  rowProps?: RowPropsAsObject<T>;
  rowOptions?: RowOptions<T>;
  virtualizedOptions?: VirtualizedOptions;
};

// internal

export type NormalTableProps<T extends TableNode> = CompactTableProps<T> & {
  tableList: T[];
};

export type VirtualizedTableProps<T extends TableNode> = CompactTableProps<T> & {
  tableList: T[];
};

export type Internals<T extends TableNode> = {
  index: number;
  style: any;
  data: { items: T[] };
};

export type InternalsObject<T extends TableNode> = {
  internals: Internals<T>;
};
