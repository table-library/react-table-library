import * as React from 'react';
import { css } from 'styled-components';
import cs from 'classnames';

import { Body } from '@table-library/react-table-library/table/Body';
import { Row } from '@table-library/react-table-library/table/Row';
import { isRowClick } from '@table-library/react-table-library/common/util/isRowClick';
import {
  isLeaf,
  hasLeaves,
} from '@table-library/react-table-library/common/util/tree';
import { useIdReducer } from '@table-library/react-table-library/common/util/useIdReducer';
import { useSyncRefState } from '@table-library/react-table-library/common/util/useSyncRefState';
import IconChevronSingleDown from '@table-library/react-table-library/common/icons/IconChevronSingleDown';
import IconChevronSingleRight from '@table-library/react-table-library/common/icons/IconChevronSingleRight';

import { TREE_EXPAND_CLICK_TYPES } from './config';

const getRowProps = (props, features) => {
  const { item, children, ...passThrough } = props;

  const { tree } = features;

  const isTreeExpanded = tree.state.ids.includes(item.id);

  const treeYLevel = props.treeYLevel || tree._options.treeYLevel;
  const treeXLevel = props.treeXLevel || tree._options.treeXLevel;

  const theme = css`
    &.row-tree-clickable {
      cursor: pointer;
    }

    .td:nth-child(${treeYLevel + 1}) > div {
      margin-left: ${treeXLevel * 20}px;
    }
  `;

  const className = cs('row-tree', {
    'row-tree-clickable':
      tree._options.clickType === TREE_EXPAND_CLICK_TYPES.RowClick,
    'row-tree-expanded': isTreeExpanded,
    'row-tree-leaf': isLeaf(item),
  });

  const onClick = (tableItem, event) => {
    if (!isRowClick(event)) return;

    if (isLeaf(tableItem)) return;

    if (
      tree._options.clickType === TREE_EXPAND_CLICK_TYPES.RowClick
    ) {
      tree.fns.onToggleById(tableItem.id);
    }
  };

  let panels = [];

  if (isTreeExpanded && hasLeaves(item)) {
    panels = panels.concat(
      <Body>
        {item.nodes.map((node) => (
          <Row
            key={node.id}
            item={node}
            {...passThrough}
            treeYLevel={treeYLevel}
            treeXLevel={treeXLevel + 1}
          >
            {(recursiveNode) => children(recursiveNode)}
          </Row>
        ))}
      </Body>
    );
  }

  return {
    theme,
    className,
    onClick,
    panels,
  };
};

const DEFAULT_STATE = {
  ids: [],
};

const DEFAULT_TREE_ICON = {
  margin: '4px',
  size: '14px',
  iconDefault: null,
  iconRight: <IconChevronSingleRight />,
  iconDown: <IconChevronSingleDown />,
};

const DEFAULT_OPTIONS = {
  treeIcon: DEFAULT_TREE_ICON,
  clickType: TREE_EXPAND_CLICK_TYPES.RowClick,
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

  return {
    state,
    fns,
    _options: mergedOptions,
    _getRowProps: getRowProps,
  };
};

export { useTree };
