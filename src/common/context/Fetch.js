import * as React from 'react';
import PropTypes from 'prop-types';

import { useReducerWithNotify } from './useReducerWithNotify';
import { addById, removeById, byAll } from './reducers';

const ADD_FETCH_BY_ID = 'ADD_FETCH_BY_ID';
const REMOVE_FETCH_BY_ID = 'REMOVE_FETCH_BY_ID';

const fetchReducer = (state, action) => {
  switch (action.type) {
    case ADD_FETCH_BY_ID: {
      return addById(state, action);
    }
    case REMOVE_FETCH_BY_ID: {
      return removeById(state, action);
    }
    default:
      throw new Error();
  }
};

const FetchContext = React.createContext({});

const DEFAULT_FETCH = {
  ids: []
};

const FetchProvider = ({ children }) => {
  const [state, dispatch] = useReducerWithNotify(
    fetchReducer,
    DEFAULT_FETCH,
    'fetch',
    'fetchState'
  );

  const onAddFetchById = React.useCallback(
    id =>
      dispatch({
        type: ADD_FETCH_BY_ID,
        payload: { id }
      }),
    [dispatch]
  );

  const onRemoveFetchById = React.useCallback(
    id =>
      dispatch({
        type: REMOVE_FETCH_BY_ID,
        payload: { id }
      }),
    [dispatch]
  );

  return (
    <FetchContext.Provider
      value={{
        fetchState: state,
        onAddFetchById,
        onRemoveFetchById
      }}
    >
      {children}
    </FetchContext.Provider>
  );
};

FetchProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func
  ])
};

export { FetchContext, FetchProvider };
