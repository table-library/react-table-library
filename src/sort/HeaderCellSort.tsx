import * as React from 'react';

import { useSortContext } from '@table-library/react-table-library/common/context/Sort';
import { HeaderCell } from '@table-library/react-table-library/table/Cell';

import { TableNode } from '@table-library/react-table-library/types/table';
import { HeaderCellSortProps } from '@table-library/react-table-library/types/sort';

import { SortButton } from './SortButton';

export const HeaderCellSort = React.memo(
  <T extends TableNode>({
    sortKey,
    sortIcon = {},
    children,
    ...passThrough
  }: HeaderCellSortProps) => {
    const sort = useSortContext<T>();

    if (!sort) {
      throw new Error('No Sort Context. No return value from useSort provided to Table component.');
    }

    return (
      <HeaderCell {...passThrough}>
        <SortButton sort={sort} sortKey={sortKey} sortIcon={sortIcon}>
          {children}
        </SortButton>
      </HeaderCell>
    );
  },
);
