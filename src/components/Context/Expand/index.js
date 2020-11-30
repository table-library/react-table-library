import * as React from 'react';
import PropTypes from 'prop-types';

const EXPAND_BY_ID = 'EXPAND_BY_ID';

const selectReducer = (state, action) => {
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
    selectReducer,
    defaultExpand
  );

  const onExpandById = id =>
    expandStateDispatcher({ type: EXPAND_BY_ID, payload: { id } });

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
  children: PropTypes.func.isRequired
};

export { ExpandContext, ExpandProvider };
