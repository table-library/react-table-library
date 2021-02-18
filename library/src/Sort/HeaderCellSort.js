import * as React from 'react';
import PropTypes from 'prop-types';

import { SortContext } from '@common/context/Sort';
import { HeaderCell } from '@table-library/react-table-library/lib/table/Cell';

import { SortButton } from './SortButton';
import { SORT_ICON_POSITIONS } from './config';

const HeaderCellSort = React.memo(
  ({ sortKey, sortFn, sortIcon = {}, children, ...passThrough }) => {
    const sort = React.useContext(SortContext);

    return (
      <HeaderCell {...passThrough}>
        <SortButton
          sort={sort}
          sortKey={sortKey}
          sortFn={sortFn}
          sortIcon={sortIcon}
        >
          {children}
        </SortButton>
      </HeaderCell>
    );
  }
);

HeaderCellSort.propTypes = {
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
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func
  ])
};

export { HeaderCellSort };
