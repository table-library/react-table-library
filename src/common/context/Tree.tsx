import * as React from 'react';

import { Nullish } from '@overmap-ai/react-table-library/types/common';
import { TableNode } from '@overmap-ai/react-table-library/types/table';
import { Tree } from '@overmap-ai/react-table-library/types/tree';

let TreeContext: any = null;

const createTreeContext = <T extends TableNode>() => {
  // singleton check
  if (TreeContext) return TreeContext;

  TreeContext = React.createContext<Tree<T> | Nullish>(null);
  return TreeContext;
};

const useTreeContext = <T extends TableNode>(): Tree<T> => {
  return React.useContext(TreeContext);
};

export { createTreeContext, useTreeContext };
