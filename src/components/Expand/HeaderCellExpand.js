import * as React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';

import { Cell } from '@table/Cell';
import { ExpandContext } from '@context/Expand';

import { ExpandButton } from './ExpandButton';

const HeaderCellExpand = React.memo(
  ({ expandIcon = {}, className, children, ...passThrough }) => {
    const expand = React.useContext(ExpandContext);
    const handleClick = () => expand.onExpandAll();

    return (
      <Cell
        className={cs('cell-expand', 'shrink', className)}
        {...passThrough}
      >
        <ExpandButton
          expand={expand}
          isExpanded={expand.expandState.allExpanded}
          expandIcon={expandIcon}
          onClick={handleClick}
        >
          {children}
        </ExpandButton>
      </Cell>
    );
  }
);

HeaderCellExpand.propTypes = {
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

export { HeaderCellExpand };
