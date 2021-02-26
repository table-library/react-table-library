import * as React from 'react';
import { css } from 'styled-components';
import cs from 'classnames';

import { Body } from '@table-library/react-table-library/lib/table/Body';
import { Row } from '@table-library/react-table-library/lib/table/Row';
import { isRowClick } from '@table-library/react-table-library/lib/common/util/isRowClick';
import {
  isLeaf,
  hasLeaves,
} from '@table-library/react-table-library/lib/common/util/tree';
import { useCommonReducer } from '@table-library/react-table-library/lib/common/util/useCommonReducer';

import { TREE_EXPAND_TYPES } from './config';

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
      tree._options.treeExpandType === TREE_EXPAND_TYPES.RowClick,
    'row-tree-expanded': isTreeExpanded,
    'row-tree-leaf': isLeaf(item),
  });

  const onClick = (tableItem, event) => {
    if (!isRowClick(event)) return;

    if (isLeaf(tableItem)) return;

    if (tree._options.treeExpandType === TREE_EXPAND_TYPES.RowClick) {
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

const DEFAULT_OPTIONS = {
  treeExpandType: TREE_EXPAND_TYPES.RowClick,
  treeXLevel: 0,
  treeYLevel: 0,
};

const useTree = (primary = {}, options = {}) => {
  const data = primary.data || undefined;
  const initialState = primary.initialState || DEFAULT_STATE;
  const onChange = primary.onChange || (() => {});

  const [state, fns] = useCommonReducer(data, initialState, onChange);

  const mergedOptions = {
    ...DEFAULT_OPTIONS,
    ...options,
  };

  return {
    state,
    fns,
    _options: mergedOptions,
    _getRowProps: getRowProps,
  };
};

export { useTree };
