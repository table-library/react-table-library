import * as React from 'react';
import { css } from 'styled-components';
import cs from 'classnames';

import { Body } from '@table-library/react-table-library/lib/table/Body';
import { Row } from '@table-library/react-table-library/lib/table/Row';
import { isRowClick } from '@common/util/isRowClick';
import { isLeaf, hasLeaves } from '@common/util/tree';
import { useCommonReducer } from '@common/util/useCommonReducer';

import { TREE_EXPAND_TYPES } from './config';

const getRowProps = (props, features) => {
  const {
    item,
    treeYLevel,
    treeXLevel,
    children,
    ...passThrough
  } = props;

  const { tree } = features;

  const isTreeExpanded = tree.state.ids.includes(item.id);

  const theme = css`
    &.row-tree-clickable {
      cursor: pointer;
    }

    .td:nth-child(${treeYLevel}) > div {
      margin-left: ${treeXLevel * 20}px;
    }
  `;

  const className = cs('row-tree', {
    'row-tree-clickable':
      tree._options.treeExpandType === TREE_EXPAND_TYPES.RowClick,
    'row-tree-expanded': isTreeExpanded,
    'row-tree-leaf': isLeaf(item)
  });

  const onClick = (tableItem, event) => {
    if (!isRowClick(event)) return;

    if (isLeaf(tableItem)) return;

    if (tree._options.treeExpandType === TREE_EXPAND_TYPES.RowClick) {
      tree.fns.onToggleById(tableItem.id);
    }
  };

  let treePanel = null;

  // if (
  //   isTreeExpanded &&
  //   !hasLeaves(item) &&
  //   panelShowCondition(item) &&
  //   loadingPanel
  // ) {
  //   treePanel = loadingPanel(item, {
  //     treeXLevel,
  //     treeYLevel
  //   });
  // }

  if (isTreeExpanded && hasLeaves(item)) {
    treePanel = (
      <Body>
        {item.nodes.map(node => (
          <Row
            key={node.id}
            item={node}
            treeYLevel={treeYLevel}
            treeXLevel={treeXLevel + 1}
            {...passThrough}
          >
            {recursiveNode => children(recursiveNode)}
          </Row>
        ))}
      </Body>
    );
  }

  return {
    name: 'tree',
    theme,
    className,
    onClick,
    tree: {
      treePanel
    }
  };
};

const DEFAULT_STATE = {
  ids: []
};

const DEFAULT_OPTIONS = {
  treeExpandType: TREE_EXPAND_TYPES.RowClick,
  treeXLevel: 0,
  treeYLevel: 0
};

const useTree = (
  { data, initialState = DEFAULT_STATE, onChange },
  options = {}
) => {
  const [state, fns] = useCommonReducer(data, initialState, onChange);

  const mergedOptions = {
    ...DEFAULT_OPTIONS,
    ...options
  };

  return {
    state,
    fns,
    _options: mergedOptions,
    _getRowProps: getRowProps
  };
};

export { useTree };
