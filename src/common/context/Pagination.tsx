import * as React from 'react';

import { Nullish } from '@overmap-ai/react-table-library/types/common';
import { TableNode } from '@overmap-ai/react-table-library/types/table';
import { Pagination } from '@overmap-ai/react-table-library/types/pagination';

let PaginationContext: any = null;

const createPaginationContext = <T extends TableNode>() => {
  // singleton check
  if (PaginationContext) return PaginationContext;

  PaginationContext = React.createContext<Pagination<T> | Nullish>(null);
  return PaginationContext;
};

const usePaginationContext = <T extends TableNode>(): Pagination<T> => {
  return React.useContext(PaginationContext);
};

export { createPaginationContext, usePaginationContext };
