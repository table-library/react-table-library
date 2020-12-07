import * as React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';

import IconChevronSingleDown from '@icons/IconChevronSingleDown';
import IconChevronSingleUp from '@icons/IconChevronSingleUp';
import IconChevronSingleUpDown from '@icons/IconChevronSingleUpDown';
import { getIcon } from '@util/getIcon';
import { isRenderProp } from '@util/isRenderProp';
import { Button } from '@shared/Button';

import { SORT_ICON_POSITIONS } from './config';

const SORT_ICON_SIZE = '14px';
const SORT_ICON_MARGIN = '4px';

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
    width: `${sortIconSize}`
  };

  if (sortState.key === sortKey && sortState.reverse) {
    return SortIconDown
      ? React.cloneElement(SortIconDown, { ...size })
      : null;
  }

  if (sortState.key === sortKey && !sortState.reverse) {
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
  sortIcon,
  children
}) => {
  const { sortState, onToggleSort } = sort;

  const handleToggleSort = () =>
    onToggleSort({ fn: sortFn, key: sortKey });

  if (isRenderProp(children)) {
    return children(sort, {
      sortKey,
      sortFn,
      onToggleSort: handleToggleSort
    });
  }

  const sortIconPosition =
    sortIcon.position || SORT_ICON_POSITIONS.Suffix;
  const sortIconSize = sortIcon.size || SORT_ICON_SIZE;
  const sortIconMargin = sortIcon.margin || SORT_ICON_MARGIN;
  const sortIconDefault = getIcon(
    sortIcon.iconDefault,
    <IconChevronSingleUpDown />
  );
  const sortIconUp = getIcon(
    sortIcon.iconUp,
    <IconChevronSingleUp />
  );
  const sortIconDown = getIcon(
    sortIcon.iconDown,
    <IconChevronSingleDown />
  );

  const prefix = sortIconPosition === SORT_ICON_POSITIONS.Prefix;
  const suffix = sortIconPosition === SORT_ICON_POSITIONS.Suffix;

  const icon = getSortIcon(
    sortState,
    sortKey,
    sortIconSize,
    sortIconDefault,
    sortIconUp,
    sortIconDown
  );

  return (
    <Button
      className={cs({
        active: sortState.key === sortKey,
        prefix,
        suffix
      })}
      margin={sortIconMargin}
      onClick={handleToggleSort}
    >
      {prefix && icon && <span>{icon}</span>}
      <div title={children}>{children}</div>
      {suffix && icon && <span>{icon}</span>}
    </Button>
  );
};

SortButton.propTypes = {
  sort: PropTypes.shape(PropTypes.any),
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

export { SortButton };
