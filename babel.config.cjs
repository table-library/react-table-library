module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react', '@emotion/babel-preset-css-prop'],
  plugins: [
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-optional-chaining',
    [
      'module-resolver',
      {
        alias: {
          '@overmap-ai/react-table-library/types': './src/types',
          '@overmap-ai/react-table-library/common': './src/common',
          '@overmap-ai/react-table-library/table': './src/table',
          '@overmap-ai/react-table-library/compact': './src/compact',
          '@overmap-ai/react-table-library/virtualized': './src/virtualized',
          // features
          '@overmap-ai/react-table-library/theme': './src/theme',
          '@table-library/react-table-library/resize': './src/resize',
          '@table-library/react-table-library/sort': './src/sort',
          '@table-library/react-table-library/select': './src/select',
          '@table-library/react-table-library/tree': './src/tree',
          '@table-library/react-table-library/pagination': './src/pagination',
          // themes
          '@table-library/react-table-library/baseline': './src/baseline',
          '@table-library/react-table-library/mantine': './src/mantine',
          '@table-library/react-table-library/chakra-ui': './src/chakra-ui',
          '@table-library/react-table-library/material-ui': './src/material-ui',
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
