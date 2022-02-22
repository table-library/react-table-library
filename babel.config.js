module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react'],
  plugins: [
    'babel-plugin-styled-components',
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-optional-chaining',
    [
      'module-resolver',
      {
        alias: {
          '@table-library/react-table-library/types': './src/types',
          '@table-library/react-table-library/common': './src/common',
          '@table-library/react-table-library/table': './src/table',
          '@table-library/react-table-library/compact': './src/compact',
          // features
          '@table-library/react-table-library/theme': './src/theme',
          '@table-library/react-table-library/resize': './src/resize',
          '@table-library/react-table-library/sort': './src/sort',
          '@table-library/react-table-library/select': './src/select',
          '@table-library/react-table-library/tree': './src/tree',
          '@table-library/react-table-library/pagination': './src/pagination',
          // themes
          '@table-library/react-table-library/themes/mantine': './src/themes/mantine',
        },
      },
    ],
    [
      '@babel/plugin-transform-runtime',
      {
        regenerator: true,
      },
    ],
  ],
  env: {
    test: {
      presets: ['@babel/preset-env', '@babel/preset-react'],
    },
  },
};
