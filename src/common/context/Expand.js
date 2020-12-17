import * as React from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash.isequal';

import { usePrevious } from '@common/util/usePrevious';

import { TableContext } from './Table';
import { useReducerWithNotify } from './useReducerWithNotify';
import { addById, removeById, byAll } from './reducers';

const ADD_EXPAND_BY_ID = 'ADD_EXPAND_BY_ID';
const REMOVE_EXPAND_BY_ID = 'REMOVE_EXPAND_BY_ID';
const EXPAND_ALL = 'EXPAND_ALL';
const SET_EXPAND = 'SET_EXPAND';

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
    case SET_EXPAND: {
      return { ...action.payload };
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
  const { data } = React.useContext(TableContext);

  const [state, dispatch] = useReducerWithNotify(
    expandReducer,
    defaultExpand,
    'expand',
    'expandState'
  );

  const defaultExpandPrev = usePrevious(defaultExpand);

  React.useEffect(() => {
    if (!isEqual(defaultExpand, defaultExpandPrev)) {
      dispatch({ type: SET_EXPAND, payload: defaultExpand });
    }
  }, [dispatch, defaultExpand, defaultExpandPrev]);

  const onAddExpandById = React.useCallback(
    id =>
      dispatch({
        type: ADD_EXPAND_BY_ID,
        payload: { id }
      }),
    [dispatch]
  );

  const onRemoveExpandById = React.useCallback(
    id =>
      dispatch({
        type: REMOVE_EXPAND_BY_ID,
        payload: { id }
      }),
    [dispatch]
  );

  const onToggleExpandById = React.useCallback(
    id =>
      state.ids.includes(id)
        ? onRemoveExpandById(id)
        : onAddExpandById(id),
    [state, onRemoveExpandById, onAddExpandById]
  );

  const onToggleExpandAll = React.useCallback(
    () =>
      dispatch({
        type: EXPAND_ALL,
        payload: { ids: data.nodes.map(item => item.id) }
      }),
    [data, dispatch]
  );

  const allExpanded =
    state.ids.sort().join(',') ===
    data.nodes
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
        onAddExpandById,
        onRemoveExpandById,
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
