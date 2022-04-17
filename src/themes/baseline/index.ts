import * as COLORS from '@table-library/react-table-library/common/colors';
import { zipThemes } from '@table-library/react-table-library/theme/index';

const GUTTER = 6;

const AESTHETIC_THEME = {
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
  `,
  HeaderCell: `
    border-bottom: 1px solid ${COLORS.BORDER};

    svg,
    path {
      fill: currentColor;
    }

    [data-table-library_button] {
      &.active {
        font-weight: bold;
      }

      span {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      div {
        text-align: left;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      div:after {
        display: block;
        content: attr(title);
        font-weight: bold;
        height: 0;
        overflow: hidden;
        visibility: hidden;
      }
    }
  `,
  Cell: '',
};

const FUNCTIONAL_THEME = {
  Table: '',
  Header: '',
  Body: '',
  /* #1 */
  // background-color
  // otherwise tree + resize would have overflow icons */
  BaseRow: `
    background-color: ${COLORS.BACKGROUND};
  `,
  HeaderRow: '',
  Row: '',
  /* #1 */
  // background-color
  // otherwise tree + resize would have overflow icons */
  BaseCell: `
    &:not(.stiff) > div {
      width: 100%;

      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    background-color: inherit;
  `,
  HeaderCell: '',
  Cell: '',
};

export const getTheme = () => {
  return zipThemes([AESTHETIC_THEME, FUNCTIONAL_THEME]);
};
