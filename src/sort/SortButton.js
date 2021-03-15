import * as React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';

import { Button } from '@table-library/react-table-library/common/components/Button';

import { SORT_ICON_POSITIONS } from './config';

const getSortIcon = (
  sortState,
  sortKey,
  sortIconSize,
  SortIconDefault,
  SortIconUp,
  SortIconDown
) => {
  const size = {
    height: `${sortIconSize}`,
    width: `${sortIconSize}`,
  };

  if (sortState.sortKey === sortKey && sortState.reverse) {
    return SortIconDown
      ? React.cloneElement(SortIconDown, { ...size })
      : null;
  }

  if (sortState.sortKey === sortKey && !sortState.reverse) {
    return SortIconUp
      ? React.cloneElement(SortIconUp, { ...size })
      : null;
  }

  return SortIconDefault
    ? React.cloneElement(SortIconDefault, { ...size })
    : null;
};

const SortButton = ({
  sort,
  sortFn,
  sortKey,
  sortIcon = {},
  children,
}) => {
  const { state, fns, _options } = sort;

  const mergedSortIconOptions = {
    ..._options.sortIcon,
    ...sortIcon,
  };

  const prefix =
    mergedSortIconOptions.position === SORT_ICON_POSITIONS.Prefix;
  const suffix =
    mergedSortIconOptions.position === SORT_ICON_POSITIONS.Suffix;

  const icon = getSortIcon(
    state,
    sortKey,
    mergedSortIconOptions.size,
    mergedSortIconOptions.iconDefault,
    mergedSortIconOptions.iconUp,
    mergedSortIconOptions.iconDown
  );

  const handleToggleSort = () =>
    fns.onToggleSort({ sortFn, sortKey });

  return (
    <Button
      className={cs({
        active: state.sortKey === sortKey,
        prefix,
        suffix,
      })}
      margin={mergedSortIconOptions.margin}
      onClick={handleToggleSort}
    >
      {prefix && icon && <span>{icon}</span>}
      <div title={children}>{children}</div>
      {suffix && icon && <span>{icon}</span>}
    </Button>
  );
};

SortButton.propTypes = {
  sort: PropTypes.objectOf(PropTypes.any),
  sortKey: PropTypes.string,
  sortFn: PropTypes.func,
  sortIcon: PropTypes.shape({
    position: PropTypes.oneOf(Object.values(SORT_ICON_POSITIONS)),
    margin: PropTypes.string,
    size: PropTypes.string,
    iconDefault: PropTypes.node,
    iconUp: PropTypes.node,
    iconDown: PropTypes.node,
  }),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func,
  ]),
};

export { SortButton };
