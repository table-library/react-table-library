import * as COLORS from '@table-library/react-table-library/common/colors';
import { zipThemes } from '@table-library/react-table-library/theme/index';

import { Theme } from '@table-library/react-table-library/types/theme';

const BASELINE_THEME = {
  Table: '',
  Header: '',
  Body: '',
  BaseRow: `
    font-size: 16px;
  `,
  HeaderRow: `
    color: ${COLORS.FONT_PRIMARY};
  `,
  Row: `
    color: ${COLORS.FONT_SECONDARY};

    &.disabled {
      color: ${COLORS.FONT_DISABLED};
    }

    &:hover {
      color: ${COLORS.FONT_PRIMARY};
    }

    &:not(:last-of-type) > .td {
      border-bottom: 1px solid ${COLORS.BORDER};
    }
  `,
  BaseCell: `
    padding: 6px 12px;
  `,
  HeaderCell: `
    font-weight: bold;
    border-bottom: 1px solid ${COLORS.BORDER};

    svg,
    path {
      fill: currentColor;
    }
  `,
  Cell: `
    &:focus {
      outline: dotted;
      outline-width: 1px;
      outline-offset: -1px;
    }
  `,
};

export const getTheme = (): Theme => {
  return zipThemes([BASELINE_THEME]);
};
