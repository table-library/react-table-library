import * as React from 'react';

import { Nullish, State, Modifier } from '@table-library/react-table-library/types/common';
import { TableNode } from '@table-library/react-table-library/types/table';

export enum SortIconPositions {
  Prefix,
  Suffix,
}

export enum SortToggleType {
  Alternate,
  AlternateWithReset,
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
  sortToggleType?: SortToggleType;
  sortIcon?: SortOptionsIcon;
  isRecursive?: boolean;
};

export type SortOptionsIconSound = Required<SortOptionsIcon>;

type SortOptionsSound = {
  [K in keyof Required<SortOptions>]: K extends 'sortIcon'
    ? SortOptionsIconSound
    : Required<SortOptions>[K];
};

export type SortFunctionInput = {
  sortKey: string;
};

export type SortFunctions = {
  onToggleSort: (sortFunctionInput: SortFunctionInput) => void;
};

export type ColumnSortProps = {
  sortKey: string;
  sortIcon?: SortOptionsIcon;
};

export type HeaderCellSortProps = {
  index?: number;
  sortKey: string;
  sortIcon?: SortOptionsIcon;
  children?: React.ReactNode;
} & Record<string, any>;

export type Sort<T extends TableNode> = {
  state: State;
  fns: SortFunctions;
  options: SortOptionsSound;
  modifier: Modifier<T>;
  components: {
    HeaderCellSort: React.FunctionComponent<HeaderCellSortProps>;
  };
};
