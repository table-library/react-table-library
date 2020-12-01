import * as React from 'react';
import PropTypes from 'prop-types';
import { css } from 'styled-components';
import cs from 'classnames';

import { Body, Row } from '@table';

import { isLeaf, hasLeaves } from '../util';
import { TREE_TYPES } from './config';

const useRowTree = ({
  id,
  item,
  treeColumnLevel,
  treeDepthLevel,
  isTreeed,
  onTreeById,
  treeType = TREE_TYPES.RowTreeClick,
  // e.g. select
  composites,
  className,
  children,
  // eslint-disable-next-line no-use-before-define
  RecursiveComponent = RowTree
}) => {
  const rowTreeTheme = css`
    &.treeable-row {
      cursor: pointer;
    }

    .td:nth-child(${treeColumnLevel}) > div {
      margin-left: ${treeDepthLevel * 20}px;
    }
  `;

  const rowTreeClassName = cs('tr', className, 'row-tree', {
    'treeable-row': treeType === TREE_TYPES.RowTreeClick
  });

  const handleClick = event => {
    if (event.target.tagName !== 'DIV' || event.target.title) return;

    if (isLeaf(item)) return;

    if (treeType === TREE_TYPES.RowTreeClick) {
      onTreeById(id);
    }
  };

  const childNodes =
    isTreeed &&
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
          className={className}
        >
          {recursiveNode => children(recursiveNode)}
        </RecursiveComponent>
      </Body>
    ));

  return {
    theme: rowTreeTheme,
    className: rowTreeClassName,
    onClick: handleClick,
    panel: childNodes
  };
};

const RowTree = React.memo(
  ({
    id,
    item,
    treeDepthLevel = 0,
    treeColumnLevel = 1,
    isTreeed,
    onTreeById,
    treeType,
    className,
    disabled,
    children
  }) => {
    const {
      theme: rowTreeTheme,
      className: rowTreeClassName,
      onClick,
      panel
    } = useRowTree({
      id,
      item,
      treeColumnLevel,
      treeDepthLevel,
      isTreeed,
      onTreeById,
      treeType,
      className,
      children
    });

    return (
      <Row
        _theme={rowTreeTheme}
        className={rowTreeClassName}
        onClick={onClick}
        disabled={disabled}
        panel={panel}
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
  isTreeed: PropTypes.bool,
  onTreeById: PropTypes.func,
  treeType: PropTypes.oneOf(Object.values(TREE_TYPES)),
  className: PropTypes.string,
  disabled: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func
  ])
};

export { RowTree, useRowTree, TREE_TYPES };
