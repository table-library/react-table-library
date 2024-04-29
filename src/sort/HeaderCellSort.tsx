import * as React from 'react';

import { useSortContext } from '@overmap-ai/react-table-library/common/context/Sort';
import { HeaderCell } from '@overmap-ai/react-table-library/table/Cell';

import { TableNode } from '@overmap-ai/react-table-library/types/table';
import { HeaderCellSortProps } from '@overmap-ai/react-table-library/types/sort';

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
