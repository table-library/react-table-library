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
          '@overmap-ai/react-table-library/resize': './src/resize',
          '@overmap-ai/react-table-library/sort': './src/sort',
          '@overmap-ai/react-table-library/select': './src/select',
          '@overmap-ai/react-table-library/tree': './src/tree',
          '@overmap-ai/react-table-library/pagination': './src/pagination',
          // themes
          '@overmap-ai/react-table-library/baseline': './src/baseline',
          '@overmap-ai/react-table-library/mantine': './src/mantine',
          '@overmap-ai/react-table-library/chakra-ui': './src/chakra-ui',
          '@overmap-ai/react-table-library/material-ui': './src/material-ui',
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
