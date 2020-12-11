import * as React from 'react';
import PropTypes from 'prop-types';

import { TableContext } from './Table';
import { useReducerWithNotify } from './useReducerWithNotify';
import { byId, byAll } from './reducers';

const EXPAND_BY_ID = 'EXPAND_BY_ID';
const EXPAND_ALL = 'EXPAND_ALL';

const expandReducer = (state, action) => {
  switch (action.type) {
    case EXPAND_BY_ID: {
      return byId(state, action);
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

  const [expandState, expandStateDispatcher] = useReducerWithNotify(
    expandReducer,
    defaultExpand,
    'expand',
    'expandState'
  );

  const onExpandById = React.useCallback(
    id =>
      expandStateDispatcher({ type: EXPAND_BY_ID, payload: { id } }),
    [expandStateDispatcher]
  );

  const onExpandAll = React.useCallback(
    () =>
      expandStateDispatcher({
        type: EXPAND_ALL,
        payload: { ids: list.map(item => item.id) }
      }),
    [list, expandStateDispatcher]
  );

  const allExpanded =
    expandState.ids.sort().join(',') ===
    list
      .map(item => item.id)
      .sort()
      .join(',');

  const noneExpanded = !expandState.ids.length;

  return (
    <ExpandContext.Provider
      value={{
        expandState: {
          ...expandState,
          allExpanded,
          noneExpanded
        },
        onExpandById,
        onExpandAll
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
