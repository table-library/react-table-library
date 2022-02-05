import { Nullish } from '@table-library/react-table-library/types/common';
import { Data, TableNode } from '@table-library/react-table-library/types/table';

import { hasLeaves } from './hasLeaves';

type ExtendedNode = {
  treeXLevel: number;
  treeYLevel: number;
  parentNode: TableNode;
  ancestors: TableNode[];
};

export const fromTreeToList = (nodes: TableNode[] | Nullish): TableNode[] =>
  (nodes || []).reduce((acc: TableNode[], value: TableNode) => {
    acc = acc.concat(value); // eslint-disable-line no-param-reassign

    if (value.nodes) {
      acc = acc.concat(fromTreeToList(value.nodes)); // eslint-disable-line no-param-reassign
    }

    return acc;
  }, []);

export const fromTreeToListExtended = (
  data: Data,
  nodes: TableNode[],
  treeIds: string[],
  treeXLevel = 0,
  treeYLevel = 0,
  parentNode: (TableNode & ExtendedNode) | Nullish,
): (TableNode & ExtendedNode)[] =>
  (nodes || []).reduce((acc: (TableNode & ExtendedNode)[], value: TableNode) => {
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
      ancestors: parentNode ? [parentNode, ...parentNode.ancestors] : [parentNode || data],
    } as ExtendedNode;

    listNode = {
      ...listNode,
      ...extendedNode,
    } as TableNode & ExtendedNode;

    acc = acc.concat(listNode); // eslint-disable-line no-param-reassign

    if (hasLeaves(value) && treeIds.includes(value.id)) {
      // eslint-disable-next-line no-param-reassign
      acc = acc.concat(
        fromTreeToListExtended(data, value.nodes!, treeIds, treeXLevel + 1, treeYLevel, {
          ...value,
          ...extendedNode,
        }),
      );
    }

    return acc;
  }, []);
