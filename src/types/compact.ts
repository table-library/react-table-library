import {
  TableNode,
  TableProps,
  RowPropsAsObject,
} from '@table-library/react-table-library/types/table';
import { ColumnSortProps } from '@table-library/react-table-library/types/sort';
import { ColumnTreeProps } from '@table-library/react-table-library/types/tree';
import { ColumnResizeProps } from '@table-library/react-table-library/types/resize';
import { ColumnHideProps } from '@table-library/react-table-library/types/hide';

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

export type CompactTableProps = TableProps & {
  columns: Column[];
  rowProps?: RowPropsAsObject;
  rowOptions?: RowOptions;
  virtualizedOptions?: VirtualizedOptions;
};

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
