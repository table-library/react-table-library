const fs = require('fs');
const path = require('path');

const withoutInternals = dir =>
  dir !== '_shared' && dir !== '__snapshots__';

const getDirectories = srcPath =>
  fs
    .readdirSync(srcPath)
    .filter(withoutInternals)
    .filter(file =>
      fs.statSync(path.join(srcPath, file)).isDirectory()
    );

const createEntries = origin => {
  return getDirectories(`./src/components/${origin}`).reduce(
    (acc, primaryFileName) => {
      const srcPath = `./src/components/${origin}/${primaryFileName}`;

      acc.primaryEntries[primaryFileName] = `${srcPath}/index.js`;

      getDirectories(srcPath).forEach(secondaryFileName => {
        acc.secondaryEntries[
          secondaryFileName
        ] = `${srcPath}/${secondaryFileName}/index.js`;
      });

      return acc;
    },
    { primaryEntries: {}, secondaryEntries: {} }
  );
};

module.exports = createEntries;
