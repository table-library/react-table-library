import * as React from 'react';
import {
  State,
  IdReducerFunctions,
  Modifier,
  Nullish,
} from '@overmap-ai/react-table-library/types/common';
import { TableNode, GetRowProps, CellProps } from '@overmap-ai/react-table-library/types/table';

export enum TreeExpandClickTypes {
  RowClick,
  ButtonClick,
}

export type CustomIcon<T extends TableNode> =
  | React.ReactElement
  | ((node: T) => React.ReactElement)
  | Nullish;

export type TreeOptionsIcon<T extends TableNode> = {
  margin?: string;
  size?: string;
  noIconMargin?: string;
  iconDefault?: CustomIcon<T>;
  iconRight?: CustomIcon<T>;
  iconDown?: CustomIcon<T>;
};

export type TreeOptions<T extends TableNode> = {
  isServer?: boolean;
  treeIcon?: TreeOptionsIcon<T>;
  clickType?: TreeExpandClickTypes;
  indentation?: number;
  treeXLevel?: number;
  treeYLevel?: number;
};

export type TreeOptionsIconSound<T extends TableNode> = {
  margin: string;
  size: string;
  noIconMargin: string;
  iconDefault: CustomIcon<T>;
  iconRight: CustomIcon<T>;
  iconDown: CustomIcon<T>;
};

export type TreeOptionsSound<T extends TableNode> = {
  isServer: boolean;
  treeIcon: TreeOptionsIconSound<T>;
  clickType: TreeExpandClickTypes;
  indentation: number;
  treeXLevel: number;
  treeYLevel: number;
};

export type ColumnTreePropsObject<T extends TableNode> = {
  treeIcon?: TreeOptionsIcon<T>;
};

export type ColumnTreeProps<T extends TableNode> = ColumnTreePropsObject<T> | boolean;

export type CellTreeProps<T extends TableNode> = {
  item: T;
  treeIcon?: TreeOptionsIcon<T>;
  children?: React.ReactNode;
} & CellProps;

export type Tree<T extends TableNode> = {
  state: State;
  fns: IdReducerFunctions<T>;
  options: TreeOptionsSound<T>;
  _getRowProps: GetRowProps<T>;
  modifier: Modifier<T>;
  components: {
    CellTree: React.FunctionComponent<CellTreeProps<T>>;
  };
};
