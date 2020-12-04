import * as React from 'react';
import PropTypes from 'prop-types';
import { css } from 'styled-components';
import cs from 'classnames';

import { Body } from '@table/Body';
import { Row } from '@table/Row';
import { isRowClick } from '@util/isRowClick';

import { isLeaf, hasLeaves } from '../util';
import { TREE_TYPES } from './config';

const useRowTree = ({
  id,
  item,
  treeColumnLevel,
  treeDepthLevel,
  isTreeExpanded,
  onTreeExpandById,
  treeType = TREE_TYPES.RowTreeClick,
  className,
  onClick,
  children,
  // eslint-disable-next-line no-use-before-define
  RecursiveComponent = RowTree,
  // e.g. select
  composites,
  ...passThrough
}) => {
  const rowTreeTheme = css`
    &.treeable-row {
      cursor: pointer;
    }

    .td:nth-child(${treeColumnLevel}) > div {
      margin-left: ${treeDepthLevel * 20}px;
    }
  `;

  const rowTreeClassName = cs(className, 'row-tree', {
    'treeable-row': treeType === TREE_TYPES.RowTreeClick
  });

  const handleClick = event => {
    if (!isRowClick(event)) return;

    if (isLeaf(item)) return;

    if (treeType === TREE_TYPES.RowTreeClick) {
      onTreeExpandById(id);
    }
  };

  const childNodes =
    isTreeExpanded &&
    hasLeaves(item) &&
    item.nodes.map(node => (
      <Body>
        <RecursiveComponent
          key={node.id}
          item={node}
          treeColumnLevel={treeColumnLevel}
          treeDepthLevel={treeDepthLevel + 1}
          treeType={treeType}
          {...composites}
          {...passThrough}
          onClick={onClick}
        >
          {recursiveNode => children(recursiveNode)}
        </RecursiveComponent>
      </Body>
    ));

  return {
    theme: rowTreeTheme,
    className: rowTreeClassName,
    handleClick,
    rowChildren: childNodes
  };
};

const RowTree = React.memo(
  ({
    id,
    item,
    treeDepthLevel = 0,
    treeColumnLevel = 1,
    isTreeExpanded,
    onTreeExpandById,
    treeType,
    className,
    onClick,
    children,
    ...passThrough
  }) => {
    const {
      theme: rowTreeTheme,
      className: rowTreeClassName,
      handleClick: handleTreeClick,
      rowChildren
    } = useRowTree({
      id,
      item,
      treeColumnLevel,
      treeDepthLevel,
      isTreeExpanded,
      onTreeExpandById,
      treeType,
      className,
      onClick,
      children,
      ...passThrough
    });

    const handleClick = (tableItem, event) => {
      handleTreeClick(event);

      if (onClick && isRowClick(event)) {
        onClick(tableItem, event);
      }
    };

    return (
      <Row
        item={item}
        theme={rowTreeTheme}
        className={rowTreeClassName}
        onClick={handleClick}
        rowChildren={rowChildren}
        {...passThrough}
      >
        {children(item)}
      </Row>
    );
  }
);

RowTree.TREE_TYPES = TREE_TYPES;

RowTree.propTypes = {
  id: PropTypes.string,
  item: PropTypes.shape(PropTypes.any),
  treeColumnLevel: PropTypes.number,
  treeDepthLevel: PropTypes.number,
  isTreeExpanded: PropTypes.bool,
  onTreeExpandById: PropTypes.func,
  treeType: PropTypes.oneOf(Object.values(TREE_TYPES)),
  className: PropTypes.string,
  onClick: PropTypes.func,
  onDoubleClick: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func
  ])
};

export { RowTree, useRowTree, TREE_TYPES };
