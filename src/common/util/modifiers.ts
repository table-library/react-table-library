import { TableNode, Features, ExtendedNode } from '@overmap-ai/react-table-library/types/table';

export const applyModifiers =
  <T extends TableNode>({ sort, pagination, tree }: Features<T>) =>
  (nodes: T[]) => {
    let modifiedNodes: ExtendedNode<T>[] = [...nodes];

    modifiedNodes = sort ? sort.modifier(modifiedNodes) : modifiedNodes;

    modifiedNodes = pagination ? pagination.modifier(modifiedNodes) : modifiedNodes;

    modifiedNodes = tree ? tree.modifier(modifiedNodes) : modifiedNodes;

    return modifiedNodes;
  };
