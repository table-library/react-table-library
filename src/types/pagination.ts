import { State, Modifier } from '@overmap-ai/react-table-library/types/common';
import { TableNode } from '@overmap-ai/react-table-library/types/table';

export type PaginationOptions = {
  isServer?: boolean;
};

export type PaginationOptionsSound = Required<PaginationOptions>;

export type PaginationFunctions = {
  onSetPage: (page: number) => void;
  onSetSize: (size: number) => void;
};

export type Pagination<T extends TableNode> = {
  state: State;
  fns: PaginationFunctions;
  options: PaginationOptionsSound;
  modifier: Modifier<T>;
};

export type Pages = Record<string, TableNode[]>;
