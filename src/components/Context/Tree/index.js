import * as React from 'react';
import PropTypes from 'prop-types';

const TREE_BY_ID = 'TREE_BY_ID';

const selectReducer = (state, action) => {
  switch (action.type) {
    case TREE_BY_ID: {
      const ids = state.ids.includes(action.payload.id)
        ? state.ids.filter(id => id !== action.payload.id)
        : state.ids.concat(action.payload.id);
      return { ...state, ids };
    }
    default:
      throw new Error();
  }
};

const TreeContext = React.createContext({});

const DEFAULT_TREE = {
  ids: []
};

const TreeProvider = ({ defaultTree = DEFAULT_TREE, children }) => {
  const [treeState, treeStateDispatcher] = React.useReducer(
    selectReducer,
    defaultTree
  );

  const onTreeById = React.useCallback(
    id => treeStateDispatcher({ type: TREE_BY_ID, payload: { id } }),
    []
  );

  return (
    <TreeContext.Provider
      value={{
        treeState,
        onTreeById
      }}
    >
      {children}
    </TreeContext.Provider>
  );
};

TreeProvider.propTypes = {
  defaultTree: PropTypes.shape({
    ids: PropTypes.arrayOf(PropTypes.string)
  }),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func
  ])
};

export { TreeContext, TreeProvider };
