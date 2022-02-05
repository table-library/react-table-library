import * as React from 'react';

import { Nullish } from '@table-library/react-table-library/types/common';
import { Select } from '@table-library/react-table-library/types/select';
import { Tree } from '@table-library/react-table-library/types/tree';
import { Sort } from '@table-library/react-table-library/types/sort';
import { Pagination } from '@table-library/react-table-library/types/pagination';

export type TableNode = {
  id: string;
  nodes?: TableNode[];
  [prop: string]: any;
};

export type OnClick = (node: TableNode, event: React.SyntheticEvent | React.KeyboardEvent) => void;

export type Data = {
  pageInfo: any;
  nodes: TableNode[];
};

export type Features = {
  select: Select | Nullish;
  tree: Tree | Nullish;
  sort: Sort | Nullish;
  pagination: Pagination | Nullish;
};

export interface RowProps {
  item: TableNode;
  className?: string;
  disabled?: boolean;
  onClick: OnClick;
  onDoubleClick: OnClick;
  children: React.ReactNode;
}

export type FeatureProps = {
  theme?: string;
  className?: string;
  onClick: OnClick;
};

export type GetRowProps = (props: RowProps, features: Features) => FeatureProps;
