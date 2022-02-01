import * as React from 'react';
import cs from 'classnames';
import { isRowClick } from '@table-library/react-table-library/common/util/isRowClick';
import {
  isLeaf,
  fromTreeToListExtended,
} from '@table-library/react-table-library/common/util/tree';
import { useIdReducer } from '@table-library/react-table-library/common/util/useIdReducer';
import { useSyncRefState } from '@table-library/react-table-library/common/util/useSyncRefState';
import IconChevronSingleDown from '@table-library/react-table-library/common/icons/IconChevronSingleDown';
import IconChevronSingleRight from '@table-library/react-table-library/common/icons/IconChevronSingleRight';

import { TREE_EXPAND_CLICK_TYPES } from './config';

const getRowProps = (props, features) => {
  const { item } = props;

  const { tree } = features;

  const isTreeExpanded = tree.state.ids.includes(item.id);

  const treeYLevel = item.treeYLevel || tree._options.treeYLevel;
  const treeXLevel = item.treeXLevel || tree._options.treeXLevel;

  const theme = `
    &.row-tree-clickable {
      cursor: pointer;
    }

    .td:nth-child(${treeYLevel + 1}) > div {
      margin-left: ${treeXLevel * tree._options.indentation}px;
    }
  `;

  const className = cs('row-tree', {
    'row-tree-clickable':
      tree._options.clickType === TREE_EXPAND_CLICK_TYPES.RowClick,
    'row-tree-expanded': isTreeExpanded,
    'row-tree-leaf': isLeaf(item),
  });

  const onClick = (node, event) => {
    if (!isRowClick(event)) return;

    if (isLeaf(node)) return;

    if (
      tree._options.clickType === TREE_EXPAND_CLICK_TYPES.RowClick
    ) {
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
  clickType: TREE_EXPAND_CLICK_TYPES.RowClick,
  indentation: 20,
  treeXLevel: 0,
  treeYLevel: 0,
};

const useTree = (data, primary = {}, options = {}, context) => {
  const primaryNullFallback = primary || {};
  const controlledState = {
    ...DEFAULT_STATE,
    ...primaryNullFallback.state,
  };
  const onChange = primaryNullFallback.onChange || (() => {});

  const [state, fns] = useIdReducer(
    data,
    controlledState,
    onChange,
    context
  );

  useSyncRefState('tree', context, state);

  const mergedOptions = {
    ...DEFAULT_OPTIONS,
    ...options,
    treeIcon: {
      ...DEFAULT_TREE_ICON,
      ...options.treeIcon,
    },
  };

  const _modifier = (nodes) => {
    if (mergedOptions.isServer) {
      return nodes;
    }

    return fromTreeToListExtended(
      data,
      nodes,
      state.ids,
      mergedOptions.treeXLevel,
      mergedOptions.treeYLevel,
      null
    );
  };

  return {
    state,
    fns,
    _options: mergedOptions,
    _getRowProps: getRowProps,
    _modifier,
  };
};

export { useTree };
