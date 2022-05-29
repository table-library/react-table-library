import { TableNode, Features } from '@table-library/react-table-library/types/table';

export const applyModifiers =
  ({ sort, pagination, tree }: Features) =>
  (nodes: TableNode[]) => {
    let modifiedNodes = [...nodes];

    modifiedNodes = sort ? sort.modifier(modifiedNodes) : modifiedNodes;

    modifiedNodes = pagination ? pagination.modifier(modifiedNodes) : modifiedNodes;

    modifiedNodes = tree ? tree.modifier(modifiedNodes) : modifiedNodes;

    return modifiedNodes;
  };
