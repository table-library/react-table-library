import * as React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import cs from 'classnames';

import { RowContainer } from '@shared';
import { ThemeContext } from '@context';
import { Body } from '@table';

import { isLeaf, hasLeaves } from '../util';

const RowExpandContainer = styled(RowContainer)`
  &.expandable-row {
    cursor: pointer;
  }

  .cell-expand > div {
    margin-left: ${({ $level }) => $level * 20}px;
  }
`;

const EXPAND_TYPES = {
  RowExpandClick: 'RowExpandClick',
  ButtonExpandClick: 'ButtonExpandClick'
};

const RowExpand = React.memo(
  ({
    id,
    item,
    isExpanded,
    onExpandById,
    expandType = EXPAND_TYPES.RowExpandClick,
    className,
    disabled,
    children,
    _level = 0
  }) => {
    const theme = React.useContext(ThemeContext);

    const handleClick = event => {
      if (event.target.tagName !== 'DIV' || event.target.title)
        return;

      if (isLeaf(item)) return;

      if (expandType === EXPAND_TYPES.RowExpandClick) {
        onExpandById(id);
      }
    };

    return (
      <>
        <RowExpandContainer
          className={cs('tr', 'row-expand', className, {
            disabled,
            'expandable-row':
              expandType === EXPAND_TYPES.RowExpandClick
          })}
          css={theme?.RowExpand}
          $level={_level}
          onClick={handleClick}
        >
          {children(item)}
        </RowExpandContainer>

        {isExpanded &&
          hasLeaves(item) &&
          item.nodes.map(node => (
            <Body>
              <RowExpand
                key={node.id}
                item={node}
                expandType={expandType}
                className={className}
                disabled={disabled}
                _level={_level + 1}
              >
                {recursiveNode => children(recursiveNode)}
              </RowExpand>
            </Body>
          ))}
      </>
    );
  }
);

RowExpand.EXPAND_TYPES = EXPAND_TYPES;

RowExpand.propTypes = {
  id: PropTypes.string,
  item: PropTypes.shape(PropTypes.any),
  isExpanded: PropTypes.bool,
  onExpandById: PropTypes.func,
  expandType: PropTypes.oneOf(Object.values(EXPAND_TYPES)),
  className: PropTypes.string,
  disabled: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  _level: PropTypes.number
};

export { RowExpand };
