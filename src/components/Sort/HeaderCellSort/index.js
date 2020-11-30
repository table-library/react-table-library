import * as React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import cs from 'classnames';

import IconChevronSingleDown from '@icons/IconChevronSingleDown';
import IconChevronSingleUp from '@icons/IconChevronSingleUp';
import IconChevronSingleUpDown from '@icons/IconChevronSingleUpDown';
import { Button, CellContainer } from '@shared';
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

const SortButton = styled(Button)`
  &.active {
    font-weight: bold;
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
      className={cs(className, 'td', 'header-cell-sort')}
      css={theme?.HeaderCellSort}
      indentation={indentation}
    >
      <div>
        <SortButton
          className={cs({
            active: sortState.key === sortKey,
            prefix,
            suffix
          })}
          margin={sortIconMargin}
          onClick={() => onSort({ fn: sortFn, key: sortKey })}
        >
          {prefix && icon && <span>{icon}</span>}
          <div title={children}>{children}</div>
          {suffix && icon && <span>{icon}</span>}
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