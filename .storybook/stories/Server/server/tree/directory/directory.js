import { TIMEOUT } from '../../timeout';

import { FOLDERS, TOP_LEVEL_FILES, FILES_BY_FOLDER } from './data';

export const getFolders = () =>
  new Promise(resolve => {
    let modifiedFolders = [...FOLDERS];

    setTimeout(() => resolve(modifiedFolders), TIMEOUT);
  });

export const getFilesByFolder = ({ id }) =>
  new Promise(resolve => {
    let modifiedTopLevelFiles = [...TOP_LEVEL_FILES];
    let modifiedByFolderFiles = { ...FILES_BY_FOLDER };

    if (!id) {
      setTimeout(() => resolve(modifiedTopLevelFiles), TIMEOUT);
    } else {
      setTimeout(() => resolve(modifiedByFolderFiles[id]), TIMEOUT);
    }
  });
