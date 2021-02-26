export const recursiveMergeInsert = (
  targetId,
  nodes,
  otherProperties
) => (node) => {
  if (node.id === targetId) {
    return {
      ...node,
      nodes: [...node.nodes, ...nodes],
      ...otherProperties,
    };
  }

  if (node.nodes) {
    return {
      ...node,
      nodes: node.nodes.map(
        recursiveMergeInsert(targetId, nodes, otherProperties)
      ),
    };
  }

  return node;
};
