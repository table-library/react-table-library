import { TableNode } from '@table-library/react-table-library/types/table';

export const isLeaf = <T extends TableNode>(node: T): boolean => !node.nodes;
