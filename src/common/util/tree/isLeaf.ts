import { TableNode } from '@overmap-ai/react-table-library/types/table';

export const isLeaf = <T extends TableNode>(node: T): boolean => !node.nodes;
