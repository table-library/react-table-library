import * as React from 'react';

import { Nullish } from '@overmap-ai/react-table-library/types/common';
import { TableNode } from '@overmap-ai/react-table-library/types/table';
import { Select } from '@overmap-ai/react-table-library/types/select';

let SelectContext: any = null;

const createSelectContext = <T extends TableNode>() => {
  // singleton check
  if (SelectContext) return SelectContext;

  SelectContext = React.createContext<Select<T> | Nullish>(null);
  return SelectContext;
};

const useSelectContext = <T extends TableNode>(): Select<T> => {
  return React.useContext(SelectContext);
};

export { createSelectContext, useSelectContext };
