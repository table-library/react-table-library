import * as React from 'react';
import PropTypes from 'prop-types';

import { byId } from './reducers';

const TREE_EXPAND_BY_ID = 'TREE_EXPAND_BY_ID';

const treeReducer = (state, action) => {
  switch (action.type) {
    case TREE_EXPAND_BY_ID: {
      return byId(state, action);
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
    treeReducer,
    defaultTree
  );

  const onTreeExpandById = React.useCallback(
    id =>
      treeStateDispatcher({
        type: TREE_EXPAND_BY_ID,
        payload: { id }
      }),
    []
  );

  return (
    <TreeContext.Provider
      value={{
        treeState,
        onTreeExpandById
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
