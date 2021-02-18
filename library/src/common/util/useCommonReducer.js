import * as React from 'react';

import {
  findNodeById,
  fromNodesToList,
  includesAll
} from '@common/util/tree';

import { useReducerWithMiddleware } from '@common/util/useReducerWithMiddleware';

export const addById = (state, action) => {
  return {
    ...state,
    ids: state.ids.concat(action.payload.id)
  };
};

export const removeById = (state, action) => {
  return {
    ...state,
    ids: state.ids.filter(id => id !== action.payload.id)
  };
};

export const addByIds = (state, action) => {
  return {
    ...state,
    ids: state.ids.concat(action.payload.ids)
  };
};

export const removeByIds = (state, action) => {
  return {
    ...state,
    ids: state.ids.filter(id => !action.payload.ids.includes(id))
  };
};
export const byAll = (state, action) => {
  const all = action.payload.ids.length === state.ids.length;

  return all
    ? {
        ...state,
        ids: []
      }
    : {
        ...state,
        ids: action.payload.ids
      };
};

export const addAll = (state, action) => {
  return {
    ...state,
    ids: [...new Set([...state.ids, ...action.payload.ids])]
  };
};

export const removeAll = state => {
  return {
    ...state,
    ids: []
  };
};

export const ADD_BY_ID = 'ADD_BY_ID';
export const REMOVE_BY_ID = 'REMOVE_BY_ID';
export const ADD_BY_ID_RECURSIVELY = 'ADD_BY_ID_RECURSIVELY';
export const REMOVE_BY_ID_RECURSIVELY = 'REMOVE_BY_ID_RECURSIVELY';
export const ADD_ALL = 'ADD_ALL';
export const REMOVE_ALL = 'REMOVE_ALL';
export const SET = 'SET';

export const reducer = (state, action) => {
  switch (action.type) {
    case ADD_BY_ID: {
      return addById(state, action);
    }
    case REMOVE_BY_ID: {
      return removeById(state, action);
    }
    case ADD_BY_ID_RECURSIVELY: {
      return addByIds(state, action);
    }
    case REMOVE_BY_ID_RECURSIVELY: {
      return removeByIds(state, action);
    }
    case ADD_ALL: {
      return addAll(state, action);
    }
    case REMOVE_ALL: {
      return removeAll(state, action);
    }
    case SET: {
      return { ...state, ...action.payload };
    }
    default:
      throw new Error();
  }
};

export const useCommonReducer = (data, initialState, onChange) => {
  const [state, dispatchWithMiddleware] = useReducerWithMiddleware(
    reducer,
    initialState,
    [],
    [onChange]
  );

  const onAddById = React.useCallback(
    id =>
      dispatchWithMiddleware({
        type: ADD_BY_ID,
        payload: { id }
      }),
    [dispatchWithMiddleware]
  );

  const onRemoveById = React.useCallback(
    id =>
      dispatchWithMiddleware({
        type: REMOVE_BY_ID,
        payload: { id }
      }),
    [dispatchWithMiddleware]
  );

  const onToggleById = React.useCallback(
    id => (state.ids.includes(id) ? onRemoveById(id) : onAddById(id)),
    [state, onAddById, onRemoveById]
  );

  const onAddByIdRecursively = React.useCallback(
    ids => {
      dispatchWithMiddleware({
        type: ADD_BY_ID_RECURSIVELY,
        payload: { ids }
      });
    },
    [dispatchWithMiddleware]
  );

  const onRemoveByIdRecursively = React.useCallback(
    ids => {
      dispatchWithMiddleware({
        type: REMOVE_BY_ID_RECURSIVELY,
        payload: { ids }
      });
    },
    [dispatchWithMiddleware]
  );

  const onToggleByIdRecursively = React.useCallback(
    id => {
      const node = findNodeById(data.nodes, id);

      const ids = [node, ...fromNodesToList(node.nodes)].map(
        item => item.id
      );

      if (includesAll(ids, state.ids)) {
        onRemoveByIdRecursively(ids);
      } else {
        onAddByIdRecursively(ids);
      }
    },
    [data, state, onAddByIdRecursively, onRemoveByIdRecursively]
  );

  const onAddAll = React.useCallback(
    ids => {
      dispatchWithMiddleware({
        type: ADD_ALL,
        payload: { ids }
      });
    },
    [dispatchWithMiddleware]
  );

  const onRemoveAll = React.useCallback(() => {
    dispatchWithMiddleware({
      type: REMOVE_ALL
    });
  }, [dispatchWithMiddleware]);

  const onToggleAll = React.useCallback(() => {
    const ids = fromNodesToList(data.nodes).map(item => item.id);

    if (includesAll(ids, state.ids)) {
      onRemoveAll();
    } else {
      onAddAll(ids);
    }
  }, [data, state, onAddAll, onRemoveAll]);

  const none = !state.ids.length;

  const all =
    !!data.nodes.length &&
    includesAll(
      data.nodes.map(item => item.id),
      state.ids
    );

  const fns = {
    onAddById,
    onRemoveById,
    onToggleById,

    onAddByIdRecursively,
    onRemoveByIdRecursively,
    onToggleByIdRecursively,

    onAddAll,
    onRemoveAll,
    onToggleAll
  };

  return [{ ...state, none, all }, fns];
};
