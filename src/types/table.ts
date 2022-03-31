import * as React from 'react';

import { Nullish } from '@table-library/react-table-library/types/common';
import { Theme } from '@table-library/react-table-library/types/theme';
import { Layout } from '@table-library/react-table-library/types/layout';
import { ColumnResizeProps } from '@table-library/react-table-library/types/resize';
import { Select } from '@table-library/react-table-library/types/select';
import { Tree } from '@table-library/react-table-library/types/tree';
import { Sort } from '@table-library/react-table-library/types/sort';
import { Pagination } from '@table-library/react-table-library/types/pagination';

// external

export type RestProps = Record<string, any>;

export type OnClick = (node: TableNode, event: React.SyntheticEvent | React.KeyboardEvent) => void;

export type CellProps = {
  className?: string;
  hide?: boolean;
  pinLeft?: boolean;
  pinRight?: boolean;
  stiff?: boolean;
  onClick?: (event: React.SyntheticEvent) => void;
  children?: React.ReactNode;
} & RestProps;

export type HeaderCellProps = {
  index?: number;
  hideKey?: string;
  className?: string;
  hide?: boolean;
  pinLeft?: boolean;
  pinRight?: boolean;
  stiff?: boolean;
  resize?: ColumnResizeProps;
  children?: React.ReactNode;
} & RestProps;

export type RowProps = {
  item: TableNode;
  className?: string;
  disabled?: boolean;
  onClick?: OnClick;
  onDoubleClick?: OnClick;
  children: React.ReactNode;
} & RestProps;

export type BodyProps = {
  children: React.ReactNode;
} & RestProps;

export type HeaderRowProps = {
  className?: string;
  children: React.ReactNode;
} & RestProps;

export type HeaderProps = {
  children: React.ReactNode;
} & RestProps;

export type TableProps = {
  data: Data;
  theme?: Theme;
  layout?: Layout;
  sort?: Sort;
  pagination?: Pagination;
  select?: Select;
  tree?: Tree;
  onInit?: OnInitFunction;
  children?: (nodes: TableNode[]) => React.ReactNode;
} & RestProps;

// external data

export type TableNode = {
  id: string;
  nodes?: TableNode[] | Nullish;
  [prop: string]: any;
};

export type Data = {
  pageInfo?: any;
  nodes: TableNode[];
};

// internal

export type OnInitFunction = (node: HTMLDivElement) => void;

export type Features = {
  select: Select | Nullish;
  tree: Tree | Nullish;
  sort: Sort | Nullish;
  pagination: Pagination | Nullish;
};

export type FeatureProps = {
  theme?: string;
  className?: string;
  onClick: OnClick;
};

export type GetRowProps = (props: RowProps, features: Features) => FeatureProps;
