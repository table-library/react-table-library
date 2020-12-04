const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const createEntries = require('./build-utils/create-entries');
const createIconEntries = require('./build-utils/create-icon-entries');

module.exports = {
  entry: {
    main: './src/index.js',
    // Icons
    Icons: './src/components/_shared/Icons/index.js',
    ...createIconEntries('Icons'),
    // Atoms
    Table: './src/components/Table/index.js',
    ...createEntries('Table').primaryEntries,
    ...createEntries('Table').secondaryEntries
  },
  output: {
    path: `${__dirname}/lib`,
    filename: '[name].js',
    library: 'react-table-library',
    libraryTarget: 'umd'
  },
  externals: {
    react: 'react',
    'react-dom': 'react-dom'
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
  plugins: [new CleanWebpackPlugin()],
  devtool: 'source-map'
};
