import { TIMEOUT } from '../timeout';

import { TREE_LIST } from './data';

export const get = () =>
  new Promise(resolve => {
    const modifiedTree = [...TREE_LIST];

    setTimeout(() => resolve(modifiedTree), TIMEOUT);
  });
