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
  isTreeExpanded,
  onTreeExpandById,
  treeType = TREE_TYPES.RowTreeClick,
  // e.g. select
  composites,
  // common
  className,
  onDoubleClick,
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

  const rowTreeClassName = cs(className, 'row-tree', {
    'treeable-row': treeType === TREE_TYPES.RowTreeClick
  });

  const handleClick = event => {
    if (event.target.tagName !== 'DIV' || event.target.title) return;

    if (isLeaf(item)) return;

    if (treeType === TREE_TYPES.RowTreeClick) {
      onTreeExpandById(id);
    }
  };

  const passThroughProps = {
    className,
    onDoubleClick
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
          {...passThroughProps}
        >
          {recursiveNode => children(recursiveNode)}
        </RecursiveComponent>
      </Body>
    ));

  return {
    theme: rowTreeTheme,
    className: rowTreeClassName,
    handleClick,
    panel: childNodes
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
    disabled,
    onDoubleClick,
    children
  }) => {
    const {
      theme: rowTreeTheme,
      className: rowTreeClassName,
      handleClick,
      panel
    } = useRowTree({
      id,
      item,
      treeColumnLevel,
      treeDepthLevel,
      isTreeExpanded,
      onTreeExpandById,
      treeType,
      className,
      onDoubleClick,
      children
    });

    return (
      <Row
        item={item}
        theme={rowTreeTheme}
        className={rowTreeClassName}
        onClick={handleClick}
        onDoubleClick={onDoubleClick}
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
  isTreeExpanded: PropTypes.bool,
  onTreeExpandById: PropTypes.func,
  treeType: PropTypes.oneOf(Object.values(TREE_TYPES)),
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onDoubleClick: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func
  ])
};

export { RowTree, useRowTree, TREE_TYPES };
