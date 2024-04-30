import * as React from 'react';

import { TableNode } from '@overmap-ai/react-table-library/types/table';
import { TableOptions, RowOptions } from '@overmap-ai/react-table-library/types/compact';

export type RowHeight = number | ((item: TableNode, index: number) => number);

export type VirtualizedProps<T extends TableNode> = {
  tableList: T[];
  rowHeight: RowHeight;
  header: () => React.ReactNode;
  body: (node: T, index: number) => React.ReactNode;
  tableOptions?: TableOptions;
  rowOptions?: RowOptions<T>;
};
