import { TableNode } from '@table-library/react-table-library/types/table';
import { findNodeById } from './findNodeById';

export const getPath = (selectedFolderId: string | null, extendedNodes: TableNode[]) => {
  if (!selectedFolderId) return '/';

  const extendedNode = findNodeById(extendedNodes, selectedFolderId);

  if (!extendedNode) return '/';

  return extendedNode.ancestors.map((node: TableNode) => `/${node.name}`).join('');
};
