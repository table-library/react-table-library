import * as React from 'react';

import { TableNode } from '@table-library/react-table-library/types/table';
import { useSelectContext } from '@table-library/react-table-library/common/context/Select';
import { useTreeContext } from '@table-library/react-table-library/common/context/Tree';
import { useSortContext } from '@table-library/react-table-library/common/context/Sort';
import { usePaginationContext } from '@table-library/react-table-library/common/context/Pagination';

export const useFeatures = <T extends TableNode>() => {
  const select = useSelectContext<T>();
  const tree = useTreeContext<T>();
  const sort = useSortContext<T>();
  const pagination = usePaginationContext<T>();

  // if changed, adjust applyModifiers usages
  return {
    select,
    tree,
    sort,
    pagination,
    // others
  };
};
