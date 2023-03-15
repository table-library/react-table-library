import * as React from 'react';

import { Nullish } from '@table-library/react-table-library/types/common';
import { TableNode } from '@table-library/react-table-library/types/table';
import { Sort } from '@table-library/react-table-library/types/sort';

let SortContext: any = null;

const createSortContext = <T extends TableNode>() => {
  // singleton check
  if (SortContext) return SortContext;

  SortContext = React.createContext<Sort<T> | Nullish>(null);
  return SortContext;
};

const useSortContext = <T extends TableNode>(): Sort<T> => {
  return React.useContext(SortContext);
};

export { createSortContext, useSortContext };
