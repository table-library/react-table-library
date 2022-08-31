import { TableNode } from '@table-library/react-table-library/types/table';

export const getExtendedNodes = (nodes: TableNode[], parentNode: TableNode | null): TableNode[] => {
  const extendedNodes = nodes.map((node) => ({
    ...node,
    ancestors: parentNode ? parentNode.ancestors.concat(node) : [node],
  }));

  return extendedNodes.map((extendedNode) => {
    if (extendedNode.nodes) {
      return {
        ...extendedNode,
        nodes: getExtendedNodes(extendedNode.nodes, extendedNode),
      };
    } else {
      return extendedNode;
    }
  });
};
