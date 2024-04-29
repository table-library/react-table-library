import * as React from 'react';

import { TableNode, Data } from '@overmap-ai/react-table-library/types/table';

let TableContext: any = null;

const createTableContext = <T extends TableNode>() => {
  // singleton check
  if (TableContext) return TableContext;

  TableContext = React.createContext<Data<T> | null>(null);
  return TableContext;
};

const useTableContext = <T extends TableNode>(): Data<T> => {
  return React.useContext(TableContext);
};

export { createTableContext, useTableContext };
