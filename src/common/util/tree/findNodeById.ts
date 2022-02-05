import { TableNode } from '@table-library/react-table-library/types/table';

export const findNodeById = (nodes: TableNode[], id: string): TableNode | null =>
  nodes.reduce((acc: TableNode | null, value: TableNode) => {
    if (acc) return acc;

    if (value.id === id) {
      return value;
    }

    if (value.nodes) {
      return findNodeById(value.nodes, id);
    }

    return acc;
  }, null);
