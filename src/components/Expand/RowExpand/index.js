import * as React from 'react';
import PropTypes from 'prop-types';
import { css } from 'styled-components';
import cs from 'classnames';

import { Body, Row } from '@table';

import { isLeaf, hasLeaves } from '../util';
import { EXPAND_TYPES } from './config';

const useRowExpand = ({
  _level,
  id,
  item,
  isExpanded,
  onExpandById,
  expandType = EXPAND_TYPES.RowExpandClick,
  className,
  children
}) => {
  const rowExpandTheme = css`
    &.expandable-row {
      cursor: pointer;
    }

    .cell-expand > div {
      margin-left: ${_level * 20}px;
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
        <RowExpand
          key={node.id}
          _level={_level + 1}
          item={node}
          expandType={expandType}
          className={className}
        >
          {recursiveNode => children(recursiveNode)}
        </RowExpand>
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
    _level = 0,
    id,
    item,
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
      _level,
      id,
      item,
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
  _level: PropTypes.number,
  id: PropTypes.string,
  item: PropTypes.shape(PropTypes.any),
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

export { RowExpand, useRowExpand };
