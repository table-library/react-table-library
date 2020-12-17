const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  entry: {
    main: './src/index.js',
    table: './src/Table/index.js',
    theme: './src/Theme/index.js',
    sort: './src/Sort/index.js',
    select: './src/Select/index.js',
    tree: './src/Tree/index.js',
    resize: './src/Resize/index.js',
    expand: './src/Expand/index.js',
    fetch: './src/Fetch/index.js'
  },
  // Webpack 4: https://v4.webpack.js.org/guides/code-splitting/#prevent-duplication
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  output: {
    path: `${__dirname}/lib`,
    filename: '[name].js',
    library: 'react-table-library',
    libraryTarget: 'umd'
  },
  externals: {
    react: 'react'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [new CleanWebpackPlugin(), new CompressionPlugin()],
  devtool: 'source-map'
};
