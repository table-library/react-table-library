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
  nodes,
  tree,
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

    // eslint-disable-next-line no-param-reassign
    acc = acc.concat({
      ...listNode,
      treeXLevel,
      treeYLevel,
      parentNode,
    });

    if (hasLeaves(value) && tree.state.ids.includes(value.id)) {
      // eslint-disable-next-line no-param-reassign
      acc = acc.concat(
        fromTreeToListExtended(
          value.nodes,
          tree,
          treeXLevel + 1,
          treeYLevel,
          value
        )
      );
    }

    return acc;
  }, []);
