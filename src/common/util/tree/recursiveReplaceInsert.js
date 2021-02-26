export const recursiveReplaceInsert = (
  targetId,
  nodes,
  otherProperties
) => (node) => {
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
      nodes: node.nodes.map(
        recursiveReplaceInsert(targetId, nodes, otherProperties)
      ),
    };
  }

  return node;
};
