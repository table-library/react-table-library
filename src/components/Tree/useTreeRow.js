import * as React from 'react';
import { css } from 'styled-components';
import cs from 'classnames';

import { Body } from '@table/Body';
import { Row } from '@table/Row';
import { isRowClick } from '@util/isRowClick';

import { isLeaf, hasLeaves } from './util';
import { TREE_EXPAND_TYPES } from './config';

const useTreeRow = ({
  item,
  treeDepthLevel = 0,
  treeColumnLevel = 1,
  isTreeExpanded,
  onTreeExpandById,
  treeType = TREE_EXPAND_TYPES.RowClick,
  children,
  ...passThrough
}) => {
  const theme = css`
    &.treeable-row {
      cursor: pointer;
    }

    .td:nth-child(${treeColumnLevel}) > div {
      margin-left: ${treeDepthLevel * 20}px;
    }
  `;

  const className = cs('row-tree', {
    'treeable-row': treeType === TREE_EXPAND_TYPES.RowClick
  });

  const onClick = (tableItem, event) => {
    if (!isRowClick(event)) return;

    if (isLeaf(tableItem)) return;

    if (treeType === TREE_EXPAND_TYPES.RowClick) {
      onTreeExpandById(tableItem.id);
    }
  };

  const recursiveTree =
    isTreeExpanded &&
    hasLeaves(item) &&
    item.nodes.map(node => (
      <Body>
        <Row
          key={node.id}
          item={node}
          treeColumnLevel={treeColumnLevel}
          treeDepthLevel={treeDepthLevel + 1}
          treeType={treeType}
          {...passThrough}
        >
          {recursiveNode => children(recursiveNode)}
        </Row>
      </Body>
    ));

  return {
    theme,
    className,
    onClick,
    // tree specific
    recursiveTree
  };
};

export { useTreeRow };
