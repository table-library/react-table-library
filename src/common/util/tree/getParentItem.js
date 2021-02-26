import { findParentItem } from './findParentItem';

export const getParentItem = (data, id) =>
  findParentItem(data, id) || data;
