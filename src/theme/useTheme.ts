// @ts-nocheck
/* eslint-disable @typescript-eslint/ban-types */

import { Theme } from '@table-library/react-table-library/types/theme';

const useTheme = (theme: Theme) =>
  Object.keys(theme).reduce((acc: Theme | {}, key: string) => {
    acc[key] = `
      ${theme[key]}
    `;

    return acc;
  }, {});

export { useTheme };

/* eslint-enable @typescript-eslint/ban-types */
