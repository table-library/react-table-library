import { TIMEOUT } from '../timeout';

// import { TOP_LEVEL_FILES, FILES_BY_FOLDER } from './data';
import { ROOT, BY_ID } from './data';

export const get = ({ id, offset, limit }) =>
  new Promise(resolve => {
    let modifiedRoot = [...ROOT];
    let modifiedById = { ...BY_ID };

    if (!id) {
      setTimeout(
        () =>
          resolve({
            nodes: modifiedRoot.slice(offset, limit),
            pageInfo: {
              total: modifiedRoot.length,
              nextOffset: offset + limit
            }
          }),
        TIMEOUT
      );
    } else {
      setTimeout(
        () =>
          resolve({
            nodes: modifiedById[id].slice(offset, limit),
            pageInfo: {
              total: modifiedById[id].length,
              nextOffset: offset + limit
            }
          }),
        TIMEOUT
      );
    }
  });

// export const getPaginatedFilesByFolder = ({ id, offset, limit }) =>
//   new Promise(resolve => {
//     let modifiedTopLevelFiles = [...TOP_LEVEL_FILES];
//     let modifiedByFolderFiles = { ...FILES_BY_FOLDER };

//     if (!id) {
//       setTimeout(
//         () =>
//           resolve({
//             nodes: modifiedTopLevelFiles.slice(offset, limit),
//             pageInfo: {
//               total: modifiedTopLevelFiles.length,
//               nextOffset: offset + limit
//             }
//           }),
//         TIMEOUT
//       );
//     } else {
//       setTimeout(
//         () =>
//           resolve({
//             nodes: modifiedByFolderFiles[id].slice(offset, limit),
//             pageInfo: {
//               total: modifiedByFolderFiles[id].length,
//               nextOffset: offset + limit
//             }
//           }),
//         TIMEOUT
//       );
//     }
//   });
