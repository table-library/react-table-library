import * as React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';

import { SortContext } from '@common/context/Sort';
import { HeaderCell } from '@table-library/react-table-library/lib/table/Cell';

import { SortButton } from './SortButton';
import { SORT_ICON_POSITIONS } from './config';

const HeaderCellSort = React.memo(
  ({
    custom,
    sortKey,
    sortFn,
    sortIcon = {},
    className,
    children,
    ...passThrough
  }) => {
    const sort = React.useContext(SortContext);

    return (
      <HeaderCell
        className={cs('th-sort', className)}
        {...passThrough}
      >
        {custom ? (
          children
        ) : (
          <SortButton
            sort={sort}
            sortKey={sortKey}
            sortFn={sortFn}
            sortIcon={sortIcon}
          >
            {children}
          </SortButton>
        )}
      </HeaderCell>
    );
  }
);

HeaderCellSort.propTypes = {
  custom: PropTypes.bool,
  sortKey: PropTypes.string,
  sortFn: PropTypes.func,
  sortIcon: PropTypes.shape({
    position: PropTypes.oneOf(Object.values(SORT_ICON_POSITIONS)),
    margin: PropTypes.string,
    size: PropTypes.string,
    iconDefault: PropTypes.node,
    iconUp: PropTypes.node,
    iconDown: PropTypes.node
  }),
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func
  ])
};

export { HeaderCellSort };
