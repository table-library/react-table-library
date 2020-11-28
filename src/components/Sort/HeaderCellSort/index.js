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

  &.active-sort {
    button {
      font-weight: bold;
    }
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

  & > div {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  &.prefix svg {
    margin-right: 4px;
  }

  &.suffix svg {
    margin-left: 4px;
  }

  & > div:after {
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

  const sortIconPosition =
    sortIcon.position || SORT_ICON_POSITIONS.Prefix;
  const sortIconSize = sortIcon.size || SORT_ICON_SIZE;
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

  const { sortState, onSort } = React.useContext(SortContext);

  const prefix = sortIconPosition === SORT_ICON_POSITIONS.Prefix;
  const suffix = sortIconPosition === SORT_ICON_POSITIONS.Suffix;

  return (
    <HeaderCellSortContainer
      className={cs('th', className, {
        'active-sort': sortState.key === sortKey
      })}
      width={width}
      css={theme?.HeaderCellSort}
      indentation={indentation}
    >
      <div>
        <SortButton
          type="button"
          className={cs({
            prefix,
            suffix
          })}
          onClick={() => onSort({ fn: sortFn, key: sortKey })}
        >
          {prefix &&
            getChevron(
              sortState,
              sortKey,
              sortIconSize,
              sortIconDefault,
              sortIconUp,
              sortIconDown
            )}
          <div title={children}>{children}</div>
          {suffix &&
            getChevron(
              sortState,
              sortKey,
              sortIconSize,
              sortIconDefault,
              sortIconUp,
              sortIconDown
            )}
        </SortButton>
      </div>
    </HeaderCellSortContainer>
  );
};

HeaderCellSort.SORT_ICON_POSITIONS = SORT_ICON_POSITIONS;

HeaderCellSort.propTypes = {
  sortKey: PropTypes.string.isRequired,
  sortFn: PropTypes.func.isRequired,
  sortIcon: PropTypes.shape({
    position: PropTypes.oneOf(Object.values(SORT_ICON_POSITIONS)),
    size: PropTypes.string
  }),
  width: PropTypes.string.isRequired,
  className: PropTypes.string,
  indentation: PropTypes.number,
  children: PropTypes.node
};

export { HeaderCellSort };
