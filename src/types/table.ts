import * as React from 'react';

import { Nullish } from '@overmap-ai/react-table-library/types/common';
import { Theme } from '@overmap-ai/react-table-library/types/theme';
import { Layout } from '@overmap-ai/react-table-library/types/layout';
import { ColumnResizeProps } from '@overmap-ai/react-table-library/types/resize';
import { Select } from '@overmap-ai/react-table-library/types/select';
import { Tree } from '@overmap-ai/react-table-library/types/tree';
import { Sort } from '@overmap-ai/react-table-library/types/sort';
import { Pagination } from '@overmap-ai/react-table-library/types/pagination';

// external data

export type Identifier = string | number;

export type TableNode = {
  id: Identifier;
  nodes?: TableNode[] | Nullish;
  [prop: string]: any;
};

export type ExtendedNode<T extends TableNode> = T & {
  treeXLevel?: number;
  treeYLevel?: number;
  parentNode?: ExtendedNode<T> | Nullish;
  ancestors?: ExtendedNode<T>[];
};

export type Data<T extends TableNode> = {
  pageInfo?: any;
  nodes: T[];
};

// external

export type RestProps = Record<string, any>;

export type Event = React.SyntheticEvent | React.KeyboardEvent;

export type OnClick<T extends TableNode> = (node: T, event: Event) => void;

export type CellProps = {
  className?: string;
  pinLeft?: boolean;
  pinRight?: boolean;
  stiff?: boolean;
  gridColumnStart?: number;
  gridColumnEnd?: number;
  onClick?: (event: React.SyntheticEvent) => void;
  children?: React.ReactNode;
} & RestProps;

export type HeaderCellProps = {
  index?: number;
  className?: string;
  hide?: boolean;
  pinLeft?: boolean;
  pinRight?: boolean;
  stiff?: boolean;
  isFooter?: boolean;
  gridColumnStart?: number;
  gridColumnEnd?: number;
  resize?: ColumnResizeProps;
  children?: React.ReactNode;
} & RestProps;

export type RowProps<T extends TableNode> = {
  item: T;
  className?: string;
  disabled?: boolean;
  onClick?: OnClick<T>;
  onDoubleClick?: OnClick<T>;
  children: React.ReactNode;
} & RestProps;

export type BodyProps = {
  children: React.ReactNode;
} & RestProps;

export type HeaderRowProps = {
  isFooter?: boolean;
  className?: string;
  children: React.ReactNode;
} & RestProps;

export type HeaderProps = {
  children: React.ReactNode;
} & RestProps;

export type TableProps<T extends TableNode> = {
  data: Data<T>;
  theme?: Theme;
  layout?: Layout;
  sort?: Sort<T>;
  pagination?: Pagination<T>;
  select?: Select<T>;
  tree?: Tree<T>;
  onInit?: OnInitFunction;
  children?: (nodes: ExtendedNode<TableNode>[]) => React.ReactNode;
} & RestProps;

// internal

export type OnInitFunction = (node: HTMLTableElement) => void;

export type Features<T extends TableNode> = {
  select: Select<T> | Nullish;
  tree: Tree<T> | Nullish;
  sort: Sort<T> | Nullish;
  pagination: Pagination<T> | Nullish;
};

export type FeatureProps<T extends TableNode> = {
  theme?: string;
  className?: string;
  onClick: OnClick<T>;
};

export type GetRowProps<T extends TableNode> = (
  props: RowProps<T>,
  features: Features<T>,
) => FeatureProps<T>;
