export const isLeaf = node => !node.nodes;
export const hasLeaves = node => !!node.nodes?.length;
