import * as React from 'react';
import cs from 'clsx';

import { Button } from '@overmap-ai/react-table-library/common/components/Button';

import { Nullish, State } from '@overmap-ai/react-table-library/types/common';
import { TableNode } from '@overmap-ai/react-table-library/types/table';
import {
  Sort,
  SortOptionsIcon,
  SortIconPositions,
} from '@overmap-ai/react-table-library/types/sort';

const getSortIcon = (
  sortState: State,
  sortKey: string,
  sortIconSize: string,
  SortIconDefault: React.ReactElement | Nullish,
  SortIconUp: React.ReactElement | Nullish,
  SortIconDown: React.ReactElement | Nullish,
) => {
  const size = {
    height: `${sortIconSize}`,
    width: `${sortIconSize}`,
  };

  if (sortState.sortKey === sortKey && sortState.reverse) {
    return SortIconDown ? React.cloneElement(SortIconDown, { ...size }) : null;
  }

  if (sortState.sortKey === sortKey && !sortState.reverse) {
    return SortIconUp ? React.cloneElement(SortIconUp, { ...size }) : null;
  }

  return SortIconDefault ? React.cloneElement(SortIconDefault, { ...size }) : null;
};

type SortButtonProps<T extends TableNode> = {
  sort: Sort<T>;
  sortKey: string;
  sortIcon: SortOptionsIcon;
  children: React.ReactNode;
};

export const SortButton = <T extends TableNode>({
  sort,
  sortKey,
  sortIcon = {},
  children,
}: SortButtonProps<T>) => {
  const { state, fns, options } = sort;

  const mergedSortIconOptions = {
    ...options.sortIcon,
    ...sortIcon,
  };

  const prefix = mergedSortIconOptions.position === SortIconPositions.Prefix;
  const suffix = mergedSortIconOptions.position === SortIconPositions.Suffix;

  const icon = getSortIcon(
    state,
    sortKey,
    mergedSortIconOptions.size,
    mergedSortIconOptions.iconDefault,
    mergedSortIconOptions.iconUp,
    mergedSortIconOptions.iconDown,
  );

  const handleToggleSort = () => fns.onToggleSort({ sortKey });

  return (
    <Button
      className={cs({
        active: state.sortKey === sortKey,
      })}
      onClick={handleToggleSort}
    >
      {prefix && icon && <span style={{ marginRight: mergedSortIconOptions.margin }}>{icon}</span>}
      <div title={typeof children === 'string' ? children : ''}>{children}</div>
      {suffix && icon && <span style={{ marginLeft: mergedSortIconOptions.margin }}>{icon}</span>}
    </Button>
  );
};
