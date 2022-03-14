import * as React from 'react';

import { SelectContext } from '@table-library/react-table-library/common/context/Select';
import { TreeContext } from '@table-library/react-table-library/common/context/Tree';
import { SortContext } from '@table-library/react-table-library/common/context/Sort';
import { PaginationContext } from '@table-library/react-table-library/common/context/Pagination';

export const useFeatures = () => {
  const select = React.useContext(SelectContext);
  const tree = React.useContext(TreeContext);
  const sort = React.useContext(SortContext);
  const pagination = React.useContext(PaginationContext);

  // if changed, adjust applyModifiers usages
  return {
    select,
    tree,
    sort,
    pagination,
    // others
  };
};
