import * as React from 'react';
import PropTypes from 'prop-types';

import { TableContext } from './Table';
import { useReducerWithNotify } from './useReducerWithNotify';
import { reducer, useCommonReducer } from './reducers';

const FetchContext = React.createContext({});

const DEFAULT_FETCH = {
  ids: []
};

const FetchProvider = ({
  defaultFetch = DEFAULT_FETCH,
  children
}) => {
  const { data } = React.useContext(TableContext);

  const [state, dispatch] = useReducerWithNotify(
    reducer,
    defaultFetch,
    'fetch',
    'fetchState'
  );

  const { all, none, ...handler } = useCommonReducer(
    data,
    state,
    dispatch,
    defaultFetch
  );

  return (
    <FetchContext.Provider
      value={{
        fetchState: {
          ...state,
          all,
          none
        },

        ...handler
      }}
    >
      {children}
    </FetchContext.Provider>
  );
};

FetchProvider.propTypes = {
  defaultFetch: PropTypes.shape({
    ids: PropTypes.arrayOf(PropTypes.string)
  }),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func
  ])
};

export { FetchContext, FetchProvider };
