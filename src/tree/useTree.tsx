import * as React from 'react';
import cs from 'clsx';
import { isRowClick } from '@overmap-ai/react-table-library/common/util/isRowClick';
import {
  isLeaf,
  fromTreeToListExtended,
} from '@overmap-ai/react-table-library/common/util/tree';
import { useIdReducer } from '@overmap-ai/react-table-library/common/util/useIdReducer';
import { useSyncRefState } from '@overmap-ai/react-table-library/common/util/useSyncRefState';
import IconChevronSingleDown from '@overmap-ai/react-table-library/common/icons/IconChevronSingleDown';
import IconChevronSingleRight from '@overmap-ai/react-table-library/common/icons/IconChevronSingleRight';

import { State, StateAndChange } from '@overmap-ai/react-table-library/types/common';
import {
  Data,
  TableNode,
  Features,
  FeatureProps,
  RowProps,
  ExtendedNode,
} from '@table-library/react-table-library/types/table';
import {
  Tree,
  TreeOptions,
  TreeExpandClickTypes,
} from '@table-library/react-table-library/types/tree';

import { CellTree } from './CellTree';

const getRowProps = <T extends TableNode>(
  props: RowProps<T>,
  features: Features<T>,
): FeatureProps<T> => {
  const { item } = props;

  const { tree } = features;

  if (!tree) {
    throw new Error("No 'tree' in getRowProps. That's odd");
  }

  const isTreeExpanded = tree.state.ids.includes(item.id);

  const treeYLevel = item.treeYLevel || tree.options.treeYLevel;
  const treeXLevel = item.treeXLevel || tree.options.treeXLevel;

  const theme = `
    &.row-tree-clickable {
      cursor: pointer;
    }

    .td:nth-of-type(${treeYLevel + 1}) > div {
      padding-left: ${treeXLevel * tree.options.indentation}px;
    }
  `;

  const className = cs('row-tree', {
    'row-tree-clickable': tree.options.clickType === TreeExpandClickTypes.RowClick,
    'row-tree-expanded': isTreeExpanded,
    'row-tree-leaf': isLeaf(item),
  });

  const onClick = (node: TableNode, event: React.SyntheticEvent | React.KeyboardEvent) => {
    if (!isRowClick(event)) return;

    if (isLeaf(node)) return;

    if (tree.options.clickType === TreeExpandClickTypes.RowClick) {
      tree.fns.onToggleById(node.id);
    }
  };

  return {
    theme,
    className,
    onClick,
  };
};

const DEFAULT_STATE = {
  ids: [],
};

const DEFAULT_TREE_ICON = {
  margin: '4px',
  size: '14px',
  noIconMargin: '0px',
  iconDefault: null,
  iconRight: <IconChevronSingleRight />,
  iconDown: <IconChevronSingleDown />,
};

const DEFAULT_OPTIONS = {
  isServer: false,
  treeIcon: DEFAULT_TREE_ICON,
  clickType: TreeExpandClickTypes.RowClick,
  indentation: 20,
  treeXLevel: 0,
  treeYLevel: 0,
};

const useTree = <T extends TableNode>(
  data: Data<T>,
  primary?: StateAndChange,
  options?: TreeOptions<T>,
  context?: any,
): Tree<T> => {
  const controlledState: State = {
    ...DEFAULT_STATE,
    ...(primary?.state ?? {}),
  };

  const onChange = primary?.onChange ? primary.onChange : () => {};

  const [state, fns] = useIdReducer<T>(data, controlledState, onChange, context);

  useSyncRefState('tree', context, state);

  const mergedOptions = {
    ...DEFAULT_OPTIONS,
    ...(options ?? {}),
    treeIcon: {
      ...DEFAULT_TREE_ICON,
      ...(options?.treeIcon ?? {}),
    },
  };

  const modifier = (nodes: T[]): ExtendedNode<T>[] => {
    if (mergedOptions.isServer) {
      return nodes;
    }

    return fromTreeToListExtended(
      data,
      nodes,
      state.ids,
      mergedOptions.treeXLevel,
      mergedOptions.treeYLevel,
      null,
    );
  };

  return {
    state,
    fns,
    options: mergedOptions,
    _getRowProps: getRowProps,
    modifier,
    components: {
      CellTree,
    },
  };
};

export { useTree };
