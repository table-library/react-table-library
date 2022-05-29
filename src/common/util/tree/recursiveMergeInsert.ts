import { TableNode } from '@table-library/react-table-library/types/table';

export const recursiveMergeInsert =
  (targetId: string, nodes: TableNode[], otherProperties: Record<any, any>) =>
  (node: TableNode): TableNode => {
    if (node.id === targetId) {
      return {
        ...node,
        nodes: [...(node?.nodes || []), ...nodes],
        ...otherProperties,
      };
    }

    if (node.nodes) {
      return {
        ...node,
        nodes: node.nodes.map(recursiveMergeInsert(targetId, nodes, otherProperties)),
      };
    }

    return node;
  };
