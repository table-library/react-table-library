import * as React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';

import { Cell } from '@table/Cell';
import { ExpandContext } from '@common/context/Expand';

import { ExpandButton } from './ExpandButton';

const CellExpand = React.memo(
  ({
    item,
    expandIcon = {},
    className,
    children,
    ...passThrough
  }) => {
    const expand = React.useContext(ExpandContext);
    const isExpanded = expand.expandState.ids.includes(item.id);
    const handleClick = () => expand.onExpandById(item.id);

    return (
      <Cell
        className={cs('td-expand', 'shrink', className)}
        {...passThrough}
      >
        <ExpandButton
          expand={expand}
          isExpanded={isExpanded}
          expandIcon={expandIcon}
          onClick={handleClick}
        >
          {children}
        </ExpandButton>
      </Cell>
    );
  }
);

CellExpand.propTypes = {
  item: PropTypes.shape(PropTypes.any),
  expandIcon: PropTypes.shape({
    size: PropTypes.string,
    iconDefault: PropTypes.node,
    iconRight: PropTypes.node,
    iconDown: PropTypes.node
  }),
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func
  ])
};

export { CellExpand };
