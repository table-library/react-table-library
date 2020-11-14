import * as React from 'react';
import PropTypes from 'prop-types';

import TableContext from './Context';
import Content from './Content';
import Body from './Body';
import Header from './Header';
import { HeaderRow, Row } from './Row';
import { HeaderCell, HeaderSortCell, Cell } from './Cell';

const sortReducer = (state, action) => {
  switch (action.type) {
    case 'SET_SORT': {
      const needsReverse =
        action.payload.sort.key === state.key && !state.reverse;

      return needsReverse
        ? {
            ...action.payload.sort,
            reverse: true,
            fn: array => action.payload.sort.fn(array).reverse()
          }
        : { ...action.payload.sort, reverse: false };
    }
    default:
      throw new Error();
  }
};

const Table = ({ list, children }) => {
  const [sort, sortDispatcher] = React.useReducer(sortReducer, {
    key: null,
    reverse: false,
    fn: array => array
  });

  const setSort = value =>
    sortDispatcher({ type: 'SET_SORT', payload: { sort: value } });

  return (
    <TableContext.Provider
      value={{
        list,
        sort,
        setSort
      }}
    >
      {children(sort.fn(list))}
    </TableContext.Provider>
  );
};

Table.propTypes = {
  list: PropTypes.arrayOf(PropTypes.any).isRequired,
  children: PropTypes.func.isRequired
};

Table.Content = Content;
Table.Header = Header;
Table.HeaderCell = HeaderCell;
Table.HeaderSortCell = HeaderSortCell;
Table.Body = Body;
Table.HeaderRow = HeaderRow;
Table.Row = Row;
Table.Cell = Cell;

export { Table };
