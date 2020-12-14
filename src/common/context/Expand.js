import * as React from 'react';
import PropTypes from 'prop-types';

import { TableContext } from './Table';
import { useReducerWithNotify } from './useReducerWithNotify';
import { addById, removeById, byAll } from './reducers';

const ADD_EXPAND_BY_ID = 'ADD_EXPAND_BY_ID';
const REMOVE_EXPAND_BY_ID = 'REMOVE_EXPAND_BY_ID';
const EXPAND_ALL = 'EXPAND_ALL';

const expandReducer = (state, action) => {
  switch (action.type) {
    case ADD_EXPAND_BY_ID: {
      return addById(state, action);
    }
    case REMOVE_EXPAND_BY_ID: {
      return removeById(state, action);
    }
    case EXPAND_ALL: {
      return byAll(state, action);
    }
    default:
      throw new Error();
  }
};

const ExpandContext = React.createContext({});

const DEFAULT_EXPAND = {
  ids: []
};

const ExpandProvider = ({
  defaultExpand = DEFAULT_EXPAND,
  children
}) => {
  const { list } = React.useContext(TableContext);

  const [state, dispatch] = useReducerWithNotify(
    expandReducer,
    defaultExpand,
    'expand',
    'expandState'
  );

  const onToggleExpandById = React.useCallback(
    id =>
      dispatch({
        type: state.ids.includes(id)
          ? REMOVE_EXPAND_BY_ID
          : ADD_EXPAND_BY_ID,
        payload: { id }
      }),
    [state, dispatch]
  );

  const onToggleExpandAll = React.useCallback(
    () =>
      dispatch({
        type: EXPAND_ALL,
        payload: { ids: list.map(item => item.id) }
      }),
    [list, dispatch]
  );

  const allExpanded =
    state.ids.sort().join(',') ===
    list
      .map(item => item.id)
      .sort()
      .join(',');

  const noneExpanded = !state.ids.length;

  return (
    <ExpandContext.Provider
      value={{
        expandState: {
          ...state,
          allExpanded,
          noneExpanded
        },
        onToggleExpandById,
        onToggleExpandAll
      }}
    >
      {children}
    </ExpandContext.Provider>
  );
};

ExpandProvider.propTypes = {
  defaultExpand: PropTypes.shape({
    ids: PropTypes.arrayOf(PropTypes.string)
  }),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func
  ])
};

export { ExpandContext, ExpandProvider };
