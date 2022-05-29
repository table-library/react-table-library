module.exports = {
  stories: ['./stories/**/*.@(js|jsx|ts|tsx|mdx)'],
  addons: ['@storybook/addon-docs', '@storybook/addon-links'],
  staticDirs: ['./static'],

  // due to storybook composition, chakra shows up as stories
  // https://github.com/chakra-ui/chakra-ui/issues/2263#issuecomment-767557426
  refs: {
    '@chakra-ui/react': { disable: true },
  },

  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    // chakra + framer motion is not working with storybook
    // https://github.com/framer/motion/issues/1307#issuecomment-966827629
    config.module.rules.push({
      type: 'javascript/auto',
      test: /\.mjs$/,
      include: /node_modules/,
    });

    // chakra does not show styles in storybook
    // https://github.com/storybookjs/storybook/issues/13114#issuecomment-846464338
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          '@emotion/core': '@emotion/react',
          '@emotion/styled': '@emotion/styled',
          'emotion-theming': '@emotion/react',
        },
      },
    };
  },
};
