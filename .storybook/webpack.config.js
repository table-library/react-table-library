const path = require('path');

module.exports = ({ config }) => {
  // Don't use Storybook's default SVG Configuration
  config.module.rules = config.module.rules.map(rule => {
    if (rule.test.toString().includes('svg')) {
      const test = rule.test
        .toString()
        .replace('svg|', '')
        .replace(/\//g, '');
      return { ...rule, test: new RegExp(test) };
    } else {
      return rule;
    }
  });

  config.module.rules.push(
    {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: ['babel-loader']
    },
    {
      test: /\.(js|jsx)?$/,
      loader: require.resolve('@storybook/source-loader'),
      enforce: 'pre'
    }

    // No other file loaders needed, because they are mocked for Jest
  );

  return config;
};
