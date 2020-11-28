import * as React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import cs from 'classnames';

import IconChevronSingleDown from '@icons/IconChevronSingleDown';
import IconChevronSingleUp from '@icons/IconChevronSingleUp';
import IconChevronSingleUpDown from '@icons/IconChevronSingleUpDown';
import { CellContainer } from '@shared';
import * as COLORS from '@colors';
import { ThemeContext, SortContext } from '@context';

const SORT_ICON_POSITIONS = {
  Prefix: 'Prefix',
  Suffix: 'Suffix'
};

const SORT_ICON_SIZE = '14px';
const SORT_ICON_MARGIN = '4px';

const getIcon = (icon, iconFallback) => {
  if (icon === null) {
    return null;
  }

  if (icon === undefined) {
    return iconFallback;
  }

  return icon;
};

const getChevron = (
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

const HeaderCellSortContainer = styled(CellContainer)`
  svg,
  path {
    stroke: ${COLORS.FONT_PRIMARY};
    fill: ${COLORS.FONT_PRIMARY};
  }
`;

const SortButton = styled.button`
  display: flex;
  align-items: center;

  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;

  width: 100%;
  height: 100%;

  div {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &.prefix div {
    margin-right: ${({ margin }) => margin};
  }

  &.suffix div {
    margin-left: ${({ margin }) => margin};
  }

  span {
    text-align: left;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  &.sort-active {
    font-weight: bold;
  }

  span:after {
    display: block;
    content: attr(title);
    font-weight: bold;
    height: 0;
    overflow: hidden;
    visibility: hidden;
  }
`;

const HeaderCellSort = ({
  sortKey,
  sortFn,
  sortIcon = {},
  width,
  className,
  indentation,
  children
}) => {
  const theme = React.useContext(ThemeContext);
  const { sortState, onSort } = React.useContext(SortContext);

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

  const icon = getChevron(
    sortState,
    sortKey,
    sortIconSize,
    sortIconDefault,
    sortIconUp,
    sortIconDown
  );

  return (
    <HeaderCellSortContainer
      width={width}
      className={className}
      css={theme?.HeaderCellSort}
      indentation={indentation}
    >
      <SortButton
        type="button"
        className={cs({
          'sort-active': sortState.key === sortKey,
          prefix,
          suffix
        })}
        margin={sortIconMargin}
        onClick={() => onSort({ fn: sortFn, key: sortKey })}
      >
        {prefix && icon && <div>{icon}</div>}
        <span title={children}>{children}</span>
        {suffix && icon && <div>{icon}</div>}
      </SortButton>
    </HeaderCellSortContainer>
  );
};

HeaderCellSort.SORT_ICON_POSITIONS = SORT_ICON_POSITIONS;

HeaderCellSort.propTypes = {
  sortKey: PropTypes.string.isRequired,
  sortFn: PropTypes.func.isRequired,
  sortIcon: PropTypes.shape({
    position: PropTypes.oneOf(Object.values(SORT_ICON_POSITIONS)),
    margin: PropTypes.string,
    size: PropTypes.string,
    iconDefault: PropTypes.node,
    iconUp: PropTypes.node,
    iconDown: PropTypes.node
  }),
  width: PropTypes.string.isRequired,
  className: PropTypes.string,
  indentation: PropTypes.number,
  children: PropTypes.node
};

export { HeaderCellSort };
