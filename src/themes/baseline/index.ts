import * as COLORS from '@table-library/react-table-library/common/colors';
import { zipThemes } from '@table-library/react-table-library/theme/index';

const GUTTER = 6;

const BASELINE_THEME = {
  Table: '',
  Header: '',
  Body: '',
  BaseRow: `
  `,
  HeaderRow: `
    font-size: 18px;
    color: ${COLORS.FONT_PRIMARY};
  `,
  Row: `
    font-size: 18px;
    color: ${COLORS.FONT_SECONDARY};

    &.disabled {
      color: ${COLORS.FONT_DISABLED};
    }

    &.clickable {
      cursor: pointer;
    }

    &:hover {
      color: ${COLORS.FONT_PRIMARY};
    }
  `,
  BaseCell: `
    padding-top: 4px;
    padding-bottom: 4px;

    &:first-of-type > div {
      padding-left: ${GUTTER}px;
    }

    & > div {
      padding-right: ${GUTTER}px;
      padding-left: 20px;
    }

    &:last-of-type > div {
      padding-right: ${GUTTER}px;
    }

    border-right: 1px solid ${COLORS.BORDER};

    &:last-of-type {
      border-right: 0px solid transparent;
    }

    &.stiff > div {
      padding-right: ${GUTTER}px;
      padding-left: ${GUTTER}px;
    }

    &:not(.stiff) > div {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  `,
  HeaderCell: `
    border-bottom: 1px solid ${COLORS.BORDER};

    svg,
    path {
      fill: currentColor;
    }
  `,
  Cell: '',
};

export const getTheme = () => {
  return zipThemes([BASELINE_THEME]);
};
