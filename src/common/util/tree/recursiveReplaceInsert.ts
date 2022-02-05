import { TableNode } from '@table-library/react-table-library/types/table';

export const recursiveReplaceInsert = (
  targetId: string,
  nodes: TableNode[],
  otherProperties: Record<any, any>,
) => (node: TableNode): TableNode => {
  if (node.id === targetId) {
    return {
      ...node,
      nodes,
      ...otherProperties,
    };
  }

  if (node.nodes) {
    return {
      ...node,
      nodes: node.nodes.map(recursiveReplaceInsert(targetId, nodes, otherProperties)),
    };
  }

  return node;
};
