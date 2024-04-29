import { TableNode } from '@overmap-ai/react-table-library/types/table';

export const findNodeById = <T extends TableNode>(nodes: T[], id: string | number): T | null =>
  nodes.reduce((acc: T | null, value: T): T | null => {
    if (acc) return acc;

    if (value.id === id) {
      return value;
    }

    if (value.nodes) {
      return findNodeById(value.nodes, id) as T;
    }

    return acc;
  }, null);
