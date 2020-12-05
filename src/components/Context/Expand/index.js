import * as React from 'react';
import PropTypes from 'prop-types';

const EXPAND_BY_ID = 'EXPAND_BY_ID';

const expandReducer = (state, action) => {
  switch (action.type) {
    case EXPAND_BY_ID: {
      const ids = state.ids.includes(action.payload.id)
        ? state.ids.filter(id => id !== action.payload.id)
        : state.ids.concat(action.payload.id);
      return { ...state, ids };
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
  const [expandState, expandStateDispatcher] = React.useReducer(
    expandReducer,
    defaultExpand
  );

  const onExpandById = React.useCallback(
    id =>
      expandStateDispatcher({
        type: EXPAND_BY_ID,
        payload: { id }
      }),
    []
  );

  return (
    <ExpandContext.Provider
      value={{
        expandState,
        onExpandById
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
