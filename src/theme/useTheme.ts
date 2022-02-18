import { Theme } from '@table-library/react-table-library/types/theme';

const zipThemes = (themes: Theme[]): Theme =>
  themes.reduce((acc: Record<string, any>, value: any) => {
    const keys = Object.keys(value);

    keys.forEach((key) => {
      if (!acc[key]) {
        acc[key] = '';
      }

      acc[key] = `
        ${acc[key]}
        ${value[key]}
      `;
    });

    return acc;
  }, {});

const useTheme = (theme: Theme | Theme[]): Theme => {
  if (Array.isArray(theme)) {
    return zipThemes(theme);
  }

  return theme;
};

export { useTheme, zipThemes };
