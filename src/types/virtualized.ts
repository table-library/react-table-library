import * as React from 'react';

import { TableNode } from '@table-library/react-table-library/types/table';
import { TableOptions, RowOptions } from '@table-library/react-table-library/types/compact';

export type RowHeight = number | ((item: TableNode, index: number) => number);

export type VirtualizedProps = {
  tableList: TableNode[];
  rowHeight: RowHeight;
  header: () => React.ReactNode;
  body: (node: TableNode, index: number) => React.ReactNode;
  tableOptions: TableOptions;
  rowOptions: RowOptions;
};
