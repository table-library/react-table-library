import * as React from 'react';

import { SortContext } from '@table-library/react-table-library/common/context/Sort';
import { HeaderCell } from '@table-library/react-table-library/table/Cell';

import { SortOptionsIcon } from '@table-library/react-table-library/types/sort';

import { SortButton } from './SortButton';

interface HeaderCellSortProps {
  index: number;
  sortKey: string;
  sortIcon: SortOptionsIcon;
  children: React.ReactNode;
}

const HeaderCellSort = React.memo(
  ({
    sortKey,
    sortIcon = {},
    children,
    ...passThrough
  }: HeaderCellSortProps & Record<string, any>) => {
    const sort = React.useContext(SortContext);

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

export { HeaderCellSort };
