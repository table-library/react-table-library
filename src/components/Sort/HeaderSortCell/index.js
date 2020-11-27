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

const CHEVRON_SIZE = 12;

const SORT_ICON_POSITIONS = {
  Prefix: 'Prefix',
  Suffix: 'Suffix'
};

const getChevron = (sort, sortKey) => {
  const size = {
    height: `${CHEVRON_SIZE}px`,
    width: `${CHEVRON_SIZE}px`
  };

  if (sort.key === sortKey && sort.reverse) {
    return <IconChevronSingleDown {...size} />;
  }

  if (sort.key === sortKey && !sort.reverse) {
    return <IconChevronSingleUp {...size} />;
  }

  return <IconChevronSingleUpDown {...size} />;
};

const HeaderCellContainerWithSort = styled(CellContainer)`
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

const HeaderSortCell = ({
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

  const { sort, setSort } = React.useContext(SortContext);

  const prefix = sortIconPosition === SORT_ICON_POSITIONS.Prefix;
  const suffix = sortIconPosition === SORT_ICON_POSITIONS.Suffix;

  return (
    <HeaderCellContainerWithSort
      className={cs('th', className, 'has-sort', {
        'active-sort': sort.key === sortKey
      })}
      width={width}
      css={theme?.Cell}
      indentation={indentation}
    >
      <div>
        <SortButton
          type="button"
          className={cs({
            prefix,
            suffix
          })}
          onClick={() => setSort({ fn: sortFn, key: sortKey })}
        >
          {prefix && getChevron(sort, sortKey)}
          <div title={children}>{children}</div>
          {suffix && getChevron(sort, sortKey)}
        </SortButton>
      </div>
    </HeaderCellContainerWithSort>
  );
};

HeaderSortCell.SORT_ICON_POSITIONS = SORT_ICON_POSITIONS;

HeaderSortCell.propTypes = {
  sortKey: PropTypes.string.isRequired,
  sortFn: PropTypes.func.isRequired,
  sortIcon: PropTypes.shape({
    position: PropTypes.oneOf(Object.values(SORT_ICON_POSITIONS))
  }),
  width: PropTypes.string.isRequired,
  className: PropTypes.string,
  indentation: PropTypes.number,
  children: PropTypes.node
};

export { HeaderSortCell };
