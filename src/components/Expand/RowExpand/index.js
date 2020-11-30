import * as React from 'react';
import PropTypes from 'prop-types';
import { css } from 'styled-components';
import cs from 'classnames';

import { Body, Row } from '@table';

import { isLeaf, hasLeaves } from '../util';
import { EXPAND_TYPES } from './config';

const useRowExpand = ({
  id,
  item,
  expandColumnLevel,
  expandDepthLevel,
  isExpanded,
  onExpandById,
  expandType = EXPAND_TYPES.RowExpandClick,
  // e.g. select
  composites,
  className,
  children,
  // eslint-disable-next-line no-use-before-define
  RecursiveComponent = RowExpand
}) => {
  const rowExpandTheme = css`
    &.expandable-row {
      cursor: pointer;
    }

    .td:nth-child(${expandColumnLevel}) > div {
      margin-left: ${expandDepthLevel * 20}px;
    }
  `;

  const rowExpandClassName = cs('tr', className, 'row-expand', {
    'expandable-row': expandType === EXPAND_TYPES.RowExpandClick
  });

  const handleClick = event => {
    if (event.target.tagName !== 'DIV' || event.target.title) return;

    if (isLeaf(item)) return;

    if (expandType === EXPAND_TYPES.RowExpandClick) {
      onExpandById(id);
    }
  };

  const childNodes =
    isExpanded &&
    hasLeaves(item) &&
    item.nodes.map(node => (
      <Body>
        <RecursiveComponent
          key={node.id}
          item={node}
          expandColumnLevel={expandColumnLevel}
          expandDepthLevel={expandDepthLevel + 1}
          expandType={expandType}
          {...composites}
          className={className}
        >
          {recursiveNode => children(recursiveNode)}
        </RecursiveComponent>
      </Body>
    ));

  return {
    theme: rowExpandTheme,
    className: rowExpandClassName,
    onClick: handleClick,
    panel: childNodes
  };
};

const RowExpand = React.memo(
  ({
    id,
    item,
    expandDepthLevel = 0,
    expandColumnLevel = 1,
    isExpanded,
    onExpandById,
    expandType,
    className,
    disabled,
    children
  }) => {
    const {
      theme: rowExpandTheme,
      className: rowExpandClassName,
      onClick,
      panel
    } = useRowExpand({
      id,
      item,
      expandColumnLevel,
      expandDepthLevel,
      isExpanded,
      onExpandById,
      expandType,
      className,
      children
    });

    return (
      <Row
        _theme={rowExpandTheme}
        className={rowExpandClassName}
        onClick={onClick}
        disabled={disabled}
        panel={panel}
      >
        {children(item)}
      </Row>
    );
  }
);

RowExpand.EXPAND_TYPES = EXPAND_TYPES;

RowExpand.propTypes = {
  id: PropTypes.string,
  item: PropTypes.shape(PropTypes.any),
  expandColumnLevel: PropTypes.number,
  expandDepthLevel: PropTypes.number,
  isExpanded: PropTypes.bool,
  onExpandById: PropTypes.func,
  expandType: PropTypes.oneOf(Object.values(EXPAND_TYPES)),
  className: PropTypes.string,
  disabled: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func
  ])
};

export { RowExpand, useRowExpand, EXPAND_TYPES };
