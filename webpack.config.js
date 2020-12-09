const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  entry: {
    main: './src/index.js',
    hooks: './src/hooks/index.js',
    Table: './src/Table/index.js',
    Theme: './src/Theme/index.js',
    Sort: './src/Sort/index.js',
    Select: './src/Select/index.js',
    Tree: './src/Tree/index.js',
    Resize: './src/Resize/index.js',
    Expand: './src/Expand/index.js'
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
