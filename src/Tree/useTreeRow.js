import * as React from 'react';
import { css } from 'styled-components';
import cs from 'classnames';

import { Body } from '@table-library/react-table-library/lib/table/Body';
import { Row } from '@table-library/react-table-library/lib/table/Row';
import { isRowClick } from '@common/util/isRowClick';

import { isLeaf, hasLeaves } from './util';
import { TREE_EXPAND_TYPES } from './config';

const useTreeRow = ({
  // general
  item,
  // options
  panelShowCondition = () => true,
  loadingPanel = null,
  treeExpandType = TREE_EXPAND_TYPES.RowClick,
  // state
  treeDepthLevel = 0,
  treeColumnLevel = 1,
  isTreeExpanded,
  onToggleTreeExpandById,
  children,
  // others
  ...passThrough
}) => {
  const theme = css`
    &.row-tree-clickable {
      cursor: pointer;
    }

    .td:nth-child(${treeColumnLevel}) > div {
      margin-left: ${treeDepthLevel * 20}px;
    }
  `;

  const className = cs('row-tree', {
    'row-tree-clickable':
      treeExpandType === TREE_EXPAND_TYPES.RowClick,
    'row-tree-expanded': isTreeExpanded,
    'row-tree-leaf': isLeaf(item)
  });

  const onClick = (tableItem, event) => {
    if (!isRowClick(event)) return;

    if (isLeaf(tableItem)) return;

    if (treeExpandType === TREE_EXPAND_TYPES.RowClick) {
      onToggleTreeExpandById(tableItem.id);
    }
  };

  let treePanel = null;

  if (
    isTreeExpanded &&
    !hasLeaves(item) &&
    panelShowCondition(item) &&
    loadingPanel
  ) {
    treePanel = loadingPanel(item, {
      treeDepthLevel,
      treeColumnLevel
    });
  }

  if (isTreeExpanded && hasLeaves(item)) {
    treePanel = item.nodes.map(node => (
      <Body>
        <Row
          key={node.id}
          item={node}
          treeColumnLevel={treeColumnLevel}
          treeDepthLevel={treeDepthLevel + 1}
          treeExpandType={treeExpandType}
          {...passThrough}
        >
          {recursiveNode => children(recursiveNode)}
        </Row>
      </Body>
    ));
  }

  return {
    name: 'treePlugin',
    theme,
    className,
    onClick,
    tree: {
      treePanel
    }
  };
};

export { useTreeRow };
