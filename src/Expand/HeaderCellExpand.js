import * as React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';

import { HeaderCell } from '@table-library/react-table-library/lib/table/Cell';
import { ExpandContext } from '@common/context/Expand';

import { ExpandButton } from './ExpandButton';

const HeaderCellExpand = React.memo(
  ({ expandIcon = {}, className, children, ...passThrough }) => {
    const expand = React.useContext(ExpandContext);
    const handleClick = () => expand.onToggleExpandAll();

    return (
      <HeaderCell
        className={cs('th-expand', 'shrink', className)}
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
      </HeaderCell>
    );
  }
);

HeaderCellExpand.propTypes = {
  expandIcon: PropTypes.shape({
    size: PropTypes.string,
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
