import { Nullish } from '@table-library/react-table-library/types/common';
import { Layout } from '@table-library/react-table-library/types/layout';

// min-width: max-content
// otherwise pin feature pushes pined columns eventually outside if sum of all column widths is greater than container size
// https://stackoverflow.com/a/57437315/1189762
const base = (layout: Layout | Nullish) => `
  display: flex;
  align-items: stretch;

  ${layout?.horizontalScroll ? 'min-width: max-content;' : ''}
`;

export const row = (layout: Layout | Nullish) => `
  [data-table-library_tr-body] {
    ${base(layout)}
  }
`;

export const headerRow = (layout: Layout | Nullish) => `
  [data-table-library_tr-header] {
    ${base(layout)}
  }
`;
