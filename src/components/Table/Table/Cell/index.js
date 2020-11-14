import * as React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import cs from 'classnames';
import IconChevronSingleDown from '@icons/IconChevronSingleDown';
import IconChevronSingleUp from '@icons/IconChevronSingleUp';
import IconChevronSingleUpDown from '@icons/IconChevronSingleUpDown';

import TableContext from '../Context';

const GUTTER_INNER = 12;
const GUTTER_OUTER = 8;

const CHEVRON_SIZE = 18;
const CHEVRON_MARGIN = 4;
const CHEVRON_SPACE = CHEVRON_SIZE + 1 * CHEVRON_MARGIN;

const CellContainer = styled.div`
  width: ${props => props.width};

  &:first-child > div {
    padding-left: ${GUTTER_OUTER}px;
  }

  & > div {
    padding-right: ${GUTTER_INNER}px;
  }

  &:last-child > div {
    padding-right: ${GUTTER_OUTER}px;
  }

  & > div {
    margin-top: 4px;
    margin-bottom: 4px;
    margin-left: ${props => (props.noIndent ? 0 : CHEVRON_SPACE)}px;
    border-right: 1px solid
      ${props => (props.noBorder ? 'transparent' : '#b6cada')};
  }
`;

const HeaderCellContainer = styled(CellContainer)`
  & > div {
    white-space: nowrap;
    overflow: hidden;
  }
`;

const HeaderCellContainerWithSort = styled(HeaderCellContainer)`
  svg,
  path {
    stroke: #141414;
    fill: #141414;
  }

  &.active-sort {
    color: #0b3f87;

    button {
      font-weight: bold;
    }

    svg,
    path {
      stroke: #0b3f87;
      fill: #0b3f87;
    }
  }
`;

const BodyCellContainer = styled(CellContainer)`
  & > div {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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

  svg {
    margin-right: ${CHEVRON_MARGIN}px;
  }
`;

const HeaderCell = ({ width, noIndent, noBorder, children }) => {
  return (
    <HeaderCellContainer
      className="th"
      width={width}
      noIndent={noIndent}
      noBorder={noBorder}
    >
      <div>{children}</div>
    </HeaderCellContainer>
  );
};

HeaderCell.propTypes = {
  width: PropTypes.string.isRequired,
  noIndent: PropTypes.bool,
  noBorder: PropTypes.bool,
  children: PropTypes.node
};

const HeaderSortCell = ({
  sortKey,
  sortFn,
  width,
  noIndent,
  noBorder,
  children
}) => {
  const size = {
    height: `${CHEVRON_SIZE}px`,
    width: `${CHEVRON_SIZE}px`
  };

  const getChevron = sort => {
    if (sort.key === sortKey && sort.reverse) {
      return <IconChevronSingleDown {...size} />;
    }

    if (sort.key === sortKey && !sort.reverse) {
      return <IconChevronSingleUp {...size} />;
    }

    return <IconChevronSingleUpDown {...size} />;
  };

  return (
    <TableContext.Consumer>
      {value => (
        <HeaderCellContainerWithSort
          width={width}
          noIndent={noIndent}
          noBorder={noBorder}
          className={cs('th', 'has-sort', {
            'active-sort': value.sort.key === sortKey
          })}
        >
          <div>
            <SortButton
              type="button"
              onClick={() =>
                value.setSort({ fn: sortFn, key: sortKey })
              }
            >
              {getChevron(value.sort)}
              <div>{children}</div>
            </SortButton>
          </div>
        </HeaderCellContainerWithSort>
      )}
    </TableContext.Consumer>
  );
};

HeaderSortCell.propTypes = {
  sortKey: PropTypes.string.isRequired,
  sortFn: PropTypes.func.isRequired,
  width: PropTypes.string.isRequired,
  noIndent: PropTypes.bool,
  noBorder: PropTypes.bool,
  children: PropTypes.node
};

const Cell = ({ width, noIndent, noBorder, children }) => (
  <BodyCellContainer
    className="td"
    width={width}
    noIndent={noIndent}
    noBorder={noBorder}
  >
    <div>{children}</div>
  </BodyCellContainer>
);

Cell.propTypes = {
  width: PropTypes.string.isRequired,
  noIndent: PropTypes.bool,
  noBorder: PropTypes.bool,
  children: PropTypes.node
};

export { HeaderCell, HeaderSortCell, Cell };
