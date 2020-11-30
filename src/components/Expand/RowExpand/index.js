import * as React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import cs from 'classnames';

import { RowContainer } from '@shared';
import { ThemeContext, ExpandContext } from '@context';

import { isLeaf, hasLeaves, EXPAND_TYPES } from '../util';

const RowExpandContainer = styled(RowContainer)`
  &.expandable-row {
    cursor: pointer;
  }

  .cell-expand div {
    margin-left: ${({ $level }) => $level * 20}px;
  }
`;

const RowExpand = ({
  item,
  expandType = EXPAND_TYPES.RowExpandClick,
  className,
  disabled,
  children,
  _level = 0
}) => {
  const theme = React.useContext(ThemeContext);
  const expand = React.useContext(ExpandContext);

  const { expandState, onExpandById } = expand;

  const handleClick = event => {
    // TODO
    // if (event.target.tagName !== 'DIV') return;

    if (expandType === EXPAND_TYPES.RowExpandClick) {
      onExpandById(item.id);
    }
  };

  const expanded = expandState.ids.includes(item.id);

  return (
    <>
      <RowExpandContainer
        className={cs('tr', 'row-expand', className, {
          disabled,
          'expandable-row': expandType === EXPAND_TYPES.RowExpandClick
        })}
        css={theme?.RowExpand}
        $level={_level}
        onClick={handleClick}
      >
        {children(item, expand)}
      </RowExpandContainer>

      {expanded &&
        hasLeaves(item) &&
        item.nodes.map(node => (
          <RowExpand
            key={node.id}
            item={node}
            expandType={expandType}
            className={className}
            disabled={disabled}
            _level={_level + 1}
          >
            {recursiveNode => children(recursiveNode, expand)}
          </RowExpand>
        ))}
    </>
  );
};

RowExpand.EXPAND_TYPES = EXPAND_TYPES;

RowExpand.propTypes = {
  item: PropTypes.shape(PropTypes.any),
  expandType: PropTypes.oneOf(Object.values(EXPAND_TYPES)),
  className: PropTypes.string,
  disabled: PropTypes.bool,
  children: PropTypes.node.isRequired,
  _level: PropTypes.number
};

export { RowExpand };
