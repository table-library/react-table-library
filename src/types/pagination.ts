import { State, Modifier } from '@table-library/react-table-library/types/common';
import { TableNode } from '@table-library/react-table-library/types/table';

export type PaginationOptions = {
  isServer?: boolean;
};

export type PaginationOptionsSound = Required<PaginationOptions>;

export type PaginationFunctions = {
  onSetPage: (page: number) => void;
  onSetSize: (size: number) => void;
};

export type Pagination<T extends TableNode> = {
  state: State & {
    getTotalPages: (nodes: Array<T>) => number;
    getPages: (nodes: Array<T>) => Array<T>;
    getPageBoundaries: (nodes: Array<T>) => { start: number; end: number };
  };
  fns: PaginationFunctions;
  options: PaginationOptionsSound;
  modifier: Modifier<T>;
};

export type Pages = Record<string, TableNode[]>;
