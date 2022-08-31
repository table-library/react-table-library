import { Nullish } from '@table-library/react-table-library/types/common';
import { TableNode } from '@table-library/react-table-library/types/table';

export const hasLeaves = <T extends TableNode>(node: T | Nullish): boolean => !!node?.nodes?.length;
