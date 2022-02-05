import * as React from 'react';

import { Nullish, State, Modifier } from '@table-library/react-table-library/types/common';
import { TableNode } from '@table-library/react-table-library/types/table';

export enum SortIconPositions {
  Prefix,
  Suffix,
}

export type SortOptionsIcon = {
  position?: SortIconPositions;
  margin?: string;
  size?: string;
  iconDefault?: React.ReactElement | Nullish;
  iconUp?: React.ReactElement | Nullish;
  iconDown?: React.ReactElement | Nullish;
};

export type SortFn = (node: TableNode[]) => TableNode[];

export type SortOptions = {
  sortFns: Record<string, SortFn>;
  isServer?: boolean;
  sortIcon?: SortOptionsIcon;
  isRecursive?: boolean;
};

export type SortOptionsIconSound = {
  position: SortIconPositions;
  margin: string;
  size: string;
  iconDefault: React.ReactElement | Nullish;
  iconUp: React.ReactElement | Nullish;
  iconDown: React.ReactElement | Nullish;
};

export type SortOptionsSound = {
  sortFns: Record<string, SortFn>;
  isServer: boolean;
  sortIcon: SortOptionsIconSound;
  isRecursive: boolean;
};

export type SortFunctionInput = {
  sortKey: string;
};

export type SortFunctions = {
  onToggleSort: (sortFunctionInput: SortFunctionInput) => void;
};

export type Sort = {
  state: State;
  fns: SortFunctions;
  options: SortOptionsSound;
  modifier: Modifier;
};
