import * as React from 'react';
import PropTypes from 'prop-types';

import { TableContext } from './Table';
import { useReducerWithNotify } from './useReducerWithNotify';
import { reducer, useCommonReducer } from './reducers';

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
    reducer,
    defaultExpand,
    'expand',
    'expandState'
  );

  const { all, none, ...handler } = useCommonReducer(
    data,
    state,
    dispatch,
    defaultExpand
  );

  return (
    <ExpandContext.Provider
      value={{
        expandState: {
          ...state,
          all,
          none
        },

        ...handler
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
