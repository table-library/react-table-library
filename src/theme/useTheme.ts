import { Theme } from '@table-library/react-table-library/types/theme';
import { css } from '@emotion/react';

const zipThemes = (themes: Theme[]): Record<string, any> => {
  const zippedThemes = themes.reduce((acc: Record<string, any>, value: any) => {
    const keys = Object.keys(value);

    keys.forEach((key) => {
      if (!acc[key]) {
        acc[key] = css``;
      }

      acc[key] = css`
        ${acc[key]}
        ${value[key]}
      `;
    });

    return acc;
  }, {});

  const baseCell = zippedThemes.BaseCell || '';
  const headerCell = zippedThemes.HeaderCell || '';
  const cell = zippedThemes.Cell || '';

  const baseRow = zippedThemes.BaseRow || '';
  const headerRow = zippedThemes.HeaderRow || '';
  const row = zippedThemes.Row || '';

  const mergedBasesThemes = {
    ...zippedThemes,
    HeaderRow: css`
      ${baseRow}
      ${headerRow}
    `,
    Row: css`
      ${baseRow}
      ${row}
    `,
    HeaderCell: css`
      ${baseCell}
      ${headerCell}
    `,
    Cell: css`
      ${baseCell}
      ${cell}
    `,
  };

  return Object.keys(mergedBasesThemes).reduce((acc: Record<string, any>, key: any) => {
    acc[key] = {
      // @ts-ignore
      css: mergedBasesThemes[key],
    };

    return acc;
  }, {});
};

const useTheme = (theme: Theme | Theme[]): Theme => {
  if (Array.isArray(theme)) {
    return zipThemes(theme);
  } else {
    return zipThemes([theme]);
  }
};

export { useTheme, zipThemes };
