import { TableNode, TableProps, RowProps } from '@table-library/react-table-library/types/table';
import { ColumnSortProps } from '@table-library/react-table-library/types/sort';
import { ColumnSelectProps } from '@table-library/react-table-library/types/select';
import { ColumnTreeProps } from '@table-library/react-table-library/types/tree';
import { ColumnResizeProps } from '@table-library/react-table-library/types/resize';
import { ColumnHideProps } from '@table-library/react-table-library/types/hide';

// external

export type Column = {
  label: string;
  renderCell: (node: TableNode) => React.ReactNode;
  footer?: string;
  resize?: ColumnResizeProps;
  sort?: ColumnSortProps;
  select?: ColumnSelectProps;
  tree?: ColumnTreeProps;
  pin?: boolean;
  hide?: ColumnHideProps;
  cellProps?: Record<string, any>;
};

export type VirtualizedOptions = {
  rowHeight: number | ((item: TableNode, index: number) => number);
  itemCount?: number;
};

export type TableOptions = {
  renderBeforeTable?: () => React.ReactNode;
  renderAfterTable?: () => React.ReactNode;
};

export type RowOptions = {
  renderBeforeRow?: (node: TableNode) => React.ReactNode;
  renderAfterRow?: (node: TableNode) => React.ReactNode;
};

export type RowPropsAsObject = Omit<RowProps, 'item' | 'children'>;

export type CompactTableProps = TableProps & {
  columns: Column[];
  tableOptions?: TableOptions;
  rowProps?: RowPropsAsObject;
  rowOptions?: RowOptions;
  virtualizedOptions?: VirtualizedOptions;
};

// internal

export type NormalTableProps = CompactTableProps & {
  tableList: TableNode[];
};

export type VirtualizedTableProps = CompactTableProps & {
  tableList: TableNode[];
};

export type Internals = {
  index: number;
  style: any;
  data: { items: TableNode[] };
};

export type InternalsObject = {
  internals: Internals;
};
