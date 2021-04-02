const useTheme = (theme) =>
  Object.keys(theme).reduce((acc, key) => {
    acc[key] = `
      ${theme[key]}
    `;

    return acc;
  }, {});

export { useTheme };
