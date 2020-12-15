import { TIMEOUT } from '../timeout';

import { ROOT, BY_ID } from './data';

export const get = ({ id }) =>
  new Promise(resolve => {
    let modifiedRoot = [...ROOT];
    let modifiedById = { ...BY_ID };

    if (!id) {
      setTimeout(() => resolve(modifiedRoot), TIMEOUT);
    } else {
      setTimeout(() => resolve(modifiedById[id]), TIMEOUT);
    }
  });
