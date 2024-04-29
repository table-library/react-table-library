import { TableNode } from '@overmap-ai/react-table-library/types/table';

export const insertNode = (nodes: TableNode[], node: TableNode) => {
  return nodes.reduce((acc: TableNode[], value: TableNode) => {
    if (value.id === node.id) {
      // eslint-disable-next-line no-param-reassign
      acc = acc.concat(node);
    } else if (!value.nodes) {
      // eslint-disable-next-line no-param-reassign
      acc = acc.concat(value);
    } else if (value.nodes) {
      // eslint-disable-next-line no-param-reassign
      acc = acc.concat({ ...value, nodes: insertNode(value.nodes, node) });
    }

    return acc;
  }, []);
};
