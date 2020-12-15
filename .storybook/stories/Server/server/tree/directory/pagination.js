import { TIMEOUT } from '../../timeout';

import { TOP_LEVEL_FILES, FILES_BY_FOLDER } from './data';

export const getPaginatedFilesByFolder = ({ id, offset, limit }) =>
  new Promise(resolve => {
    let modifiedTopLevelFiles = [...TOP_LEVEL_FILES];
    let modifiedByFolderFiles = { ...FILES_BY_FOLDER };

    if (!id) {
      setTimeout(
        () =>
          resolve({
            nodes: modifiedTopLevelFiles.slice(offset, limit),
            pageInfo: {
              total: modifiedTopLevelFiles.length,
              nextOffset: offset + limit
            }
          }),
        TIMEOUT
      );
    } else {
      setTimeout(() => resolve(modifiedByFolderFiles[id]), TIMEOUT);
    }
  });
