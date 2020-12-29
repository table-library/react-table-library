export const isLeaf = node => !node.nodes;

export const hasLeaves = node => !!node.nodes?.length;

export const fromNodesToList = (nodes = []) =>
  nodes.reduce((acc, value) => {
    // eslint-disable-next-line no-param-reassign
    acc = acc.concat(value);

    if (value.nodes) {
      // eslint-disable-next-line no-param-reassign
      acc = acc.concat(fromNodesToList(value.nodes));
    }

    return acc;
  }, []);

export const findNodeById = (nodes, id) =>
  nodes.reduce((acc, value) => {
    if (acc) return acc;

    if (value.id === id) {
      return value;
    }

    if (value.nodes) {
      return findNodeById(value.nodes, id);
    }

    return acc;
  }, null);

export const includesAll = (idsOne, idsTwo) => {
  return idsOne.every(id => idsTwo.includes(id));
};

export const recursiveInsert = (
  targetId,
  nodes,
  otherProperties
) => node => {
  if (node.id === targetId) {
    return {
      ...node,
      nodes: [...node.nodes, ...nodes],
      ...otherProperties
    };
  }

  if (node.nodes) {
    return {
      ...node,
      nodes: node.nodes.map(
        recursiveInsert(targetId, nodes, otherProperties)
      )
    };
  }

  return node;
};
