import { TableNode } from '@table-library/react-table-library/types/table';

export const isLeaf = (node: TableNode) => !node.nodes;
