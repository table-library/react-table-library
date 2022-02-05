import { TableNode } from '@table-library/react-table-library/types/table';

export const hasLeaves = (node: TableNode) => !!node.nodes?.length;
