import * as React from 'react';
import PropTypes from 'prop-types';

import { TableContext } from '../Table';

const SELECT_BY_ID = 'SELECT_BY_ID';
const SELECT_ALL = 'SELECT_ALL';

const selectReducer = (state, action) => {
  switch (action.type) {
    case SELECT_BY_ID: {
      const needsUnselect = state.ids.includes(action.payload.id);

      return needsUnselect
        ? {
            ...state,
            ids: state.ids.filter(idx => idx !== action.payload.id)
          }
        : {
            ...state,
            ids: state.ids.concat(action.payload.id)
          };
    }
    case SELECT_ALL: {
      const needsUnselect =
        action.payload.ids.length === state.ids.length;

      return needsUnselect
        ? {
            ...state,
            ids: []
          }
        : {
            ...state,
            ids: action.payload.ids
          };
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

  const onSelectById = id =>
    selectStateDispatcher({ type: SELECT_BY_ID, payload: { id } });

  const onSelectAll = () =>
    selectStateDispatcher({
      type: SELECT_ALL,
      payload: { ids: list.map(item => item.id) }
    });

  const allSelected =
    selectState.ids.sort().join(',') ===
    list
      .map(item => item.id)
      .sort()
      .join(',');

  const noneSelected = !selectState.ids.length;

  const mergedSelectState = {
    ...selectState,
    allSelected,
    noneSelected
  };

  return (
    <SelectContext.Provider
      value={{
        selectState: mergedSelectState,
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
  children: PropTypes.func.isRequired
};

export { SelectContext, SelectProvider };
