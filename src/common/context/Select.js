import * as React from 'react';
import PropTypes from 'prop-types';

import { TableContext } from './Table';
import { byId, byAll } from './reducers';

const SELECT_BY_ID = 'SELECT_BY_ID';
const SELECT_ALL = 'SELECT_ALL';

const selectReducer = (state, action) => {
  switch (action.type) {
    case SELECT_BY_ID: {
      return byId(state, action);
    }
    case SELECT_ALL: {
      return byAll(state, action);
    }
    default:
      throw new Error();
  }
};

const SelectContext = React.createContext({});

const DEFAULT_SELECT = {
  ids: []
};

const SelectProvider = ({
  defaultSelect = DEFAULT_SELECT,
  children
}) => {
  const { list } = React.useContext(TableContext);

  const [selectState, selectStateDispatcher] = React.useReducer(
    selectReducer,
    defaultSelect
  );

  const onSelectById = React.useCallback(
    id =>
      selectStateDispatcher({ type: SELECT_BY_ID, payload: { id } }),
    []
  );

  const onSelectAll = React.useCallback(
    () =>
      selectStateDispatcher({
        type: SELECT_ALL,
        payload: { ids: list.map(item => item.id) }
      }),
    [list]
  );

  const allSelected =
    selectState.ids.sort().join(',') ===
    list
      .map(item => item.id)
      .sort()
      .join(',');

  const noneSelected = !selectState.ids.length;

  return (
    <SelectContext.Provider
      value={{
        selectState: {
          ...selectState,
          allSelected,
          noneSelected
        },
        onSelectById,
        onSelectAll
      }}
    >
      {children}
    </SelectContext.Provider>
  );
};

SelectProvider.propTypes = {
  defaultSelect: PropTypes.shape({
    ids: PropTypes.arrayOf(PropTypes.string)
  }),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func
  ])
};

export { SelectContext, SelectProvider };
