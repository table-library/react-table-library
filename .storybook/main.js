const path = require('path');

module.exports = {
  stories: ['./stories/**/*.@(js|jsx|ts|tsx|mdx)'],
  addons: ['@storybook/addon-docs', '@storybook/addon-links'],
  staticDirs: ['./static'],

  // due to storybook composition, chakra shows up as stories
  // https://github.com/chakra-ui/chakra-ui/issues/2263#issuecomment-767557426
  refs: {
    '@chakra-ui/react': { disable: true },
  },
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-vite',
    disableTelemetry: true,
  },

  async viteFinal(config, { configType }) {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    // chakra does not show styles in storybook
    // https://github.com/storybookjs/storybook/issues/13114#issuecomment-846464338
    return {
      ...config,
      build: {
        ...(config?.build ?? {}),
        // https://github.com/storybookjs/builder-vite/issues/409
        // https://github.com/vitejs/vite/issues/2433
        sourcemap: false,
        // minify: false,
        rollupOptions: {
          ...(config?.build?.rollupOptions ?? {}),
          maxParallelFileOps: 2,
          cache: false,
          output: {
            sourcemap: false,
            manualChunks: (id) => {
              if (id.includes('node_modules')) {
                return 'vendor';
              }
            },
          },
        },
      },
      resolve: {
        ...(config?.resolve ?? {}),
        alias: [
          {
            find: '@table-library/react-table-library/types',
            replacement: path.resolve(__dirname, '../src/types/'),
          },
          {
            find: '@table-library/react-table-library/common',
            replacement: path.resolve(__dirname, '../src/common/'),
          },
          {
            find: '@table-library/react-table-library/table',
            replacement: path.resolve(__dirname, '../src/table/'),
          },
          {
            find: '@table-library/react-table-library/compact',
            replacement: path.resolve(__dirname, '../src/compact/'),
          },
          {
            find: '@table-library/react-table-library/virtualized',
            replacement: path.resolve(__dirname, '../src/virtualized/'),
          },
          {
            find: '@table-library/react-table-library/theme',
            replacement: path.resolve(__dirname, '../src/theme/'),
          },
          {
            find: '@table-library/react-table-library/resize',
            replacement: path.resolve(__dirname, '../src/resize/'),
          },
          {
            find: '@table-library/react-table-library/sort',
            replacement: path.resolve(__dirname, '../src/sort/'),
          },
          {
            find: '@table-library/react-table-library/select',
            replacement: path.resolve(__dirname, '../src/select/'),
          },
          {
            find: '@table-library/react-table-library/tree',
            replacement: path.resolve(__dirname, '../src/tree/'),
          },
          {
            find: '@table-library/react-table-library/pagination',
            replacement: path.resolve(__dirname, '../src/pagination/'),
          },
          {
            find: '@table-library/react-table-library/baseline',
            replacement: path.resolve(__dirname, '../src/baseline/'),
          },
          {
            find: '@table-library/react-table-library/mantine',
            replacement: path.resolve(__dirname, '../src/mantine/'),
          },
          {
            find: '@table-library/react-table-library/chakra-ui',
            replacement: path.resolve(__dirname, '../src/chakra-ui/'),
          },
          {
            find: '@table-library/react-table-library/material-ui',
            replacement: path.resolve(__dirname, '../src/material-ui/'),
          },
          {
            find: '@emotion/core',
            replacement: '@emotion/react',
          },
          {
            find: '@emotion/styled',
            replacement: '@emotion/styled',
          },
          {
            find: 'emotion-theming',
            replacement: '@emotion/react',
          },
        ],
      },
    };
  },
};
