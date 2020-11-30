export const isLeaf = node => !node.nodes;
export const hasLeaves = node => !!node.nodes?.length;

export const EXPAND_TYPES = {
  RowExpandClick: 'RowExpandClick',
  ButtonExpandClick: 'ButtonExpandClick'
};
