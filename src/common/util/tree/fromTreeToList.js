import { hasLeaves } from './hasLeaves';

export const fromTreeToList = (nodes) =>
  (nodes || []).reduce((acc, value) => {
    // eslint-disable-next-line no-param-reassign
    acc = acc.concat(value);

    if (value.nodes) {
      // eslint-disable-next-line no-param-reassign
      acc = acc.concat(fromTreeToList(value.nodes));
    }

    return acc;
  }, []);

export const fromTreeToListExtended = (
  data,
  nodes,
  treeIds,
  treeXLevel = 0,
  treeYLevel = 0,
  parentNode = null
) =>
  (nodes || []).reduce((acc, value) => {
    let listNode;

    if (value.nodes) {
      listNode = { ...value, nodes: [] };
    } else {
      listNode = value;
    }

    const extendedNode = {
      treeXLevel,
      treeYLevel,
      parentNode: parentNode || data,
      ancestors: parentNode
        ? [parentNode, ...parentNode.ancestors]
        : [parentNode || data],
    };

    listNode = {
      ...listNode,
      ...extendedNode,
    };

    // eslint-disable-next-line no-param-reassign
    acc = acc.concat(listNode);

    if (hasLeaves(value) && treeIds.includes(value.id)) {
      // eslint-disable-next-line no-param-reassign
      acc = acc.concat(
        fromTreeToListExtended(
          data,
          value.nodes,
          treeIds,
          treeXLevel + 1,
          treeYLevel,
          { ...value, ...extendedNode }
        )
      );
    }

    return acc;
  }, []);
