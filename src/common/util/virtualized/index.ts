import { TableNode } from '@overmap-ai/react-table-library/types/table';
import { Nullish } from '@overmap-ai/react-table-library/types/common';
import { RowHeight } from '@overmap-ai/react-table-library/types/virtualized';

export const getRowHeight = (
  rowHeight: RowHeight | Nullish,
  item: TableNode,
  index: number,
): number => {
  let actualRowHeight = 0;
  if (rowHeight) {
    if (typeof rowHeight === 'number') {
      actualRowHeight = rowHeight;
    }

    if (typeof rowHeight === 'function') {
      actualRowHeight = rowHeight(item, index);
    }
  }

  return actualRowHeight;
};

export const SHARED_VIRTUALIZE_STYLE = {
  display: 'grid',
  gridTemplateColumns: 'var(--data-table-library_grid-template-columns)',
};
