import { css } from 'styled-components';

const useTheme = theme =>
  Object.keys(theme).reduce((acc, key) => {
    acc[key] = css`
      ${theme[key]}
    `;

    return acc;
  }, {});

export { useTheme };
