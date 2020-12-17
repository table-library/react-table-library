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
            nodes: modifiedRoot.slice(offset, offset + limit),
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
            nodes: modifiedById[id].slice(offset, offset + limit),
            pageInfo: {
              total: modifiedById[id].length,
              nextOffset: offset + limit
            }
          }),
        TIMEOUT
      );
    }
  });
