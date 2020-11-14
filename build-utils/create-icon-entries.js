const glob = require('glob');

const withoutInternals = path =>
  !path.includes('index.js') &&
  !path.includes('spec.js') &&
  !path.includes('stories.js');

const createIconEntries = origin =>
  glob
    .sync(`./src/components/${origin}/*.js`)
    .filter(withoutInternals)
    .map(path => path.replace(`./src/components/${origin}/`, ''))
    .map(path => path.replace(`.js`, ''))
    .reduce((acc, value) => {
      acc[value] = `./src/components/${origin}/${value}.js`;
      return acc;
    }, {});

module.exports = createIconEntries;
