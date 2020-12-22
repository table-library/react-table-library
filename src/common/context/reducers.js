import * as React from 'react';
import isEqual from 'lodash.isequal';

import { usePrevious } from '@common/util/usePrevious';
import {
  findItemsById,
  findAllItems,
  isAll
} from '@common/util/tree';

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
    ids: action.payload.ids
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

export const useCommonReducer = (
  data,
  state,
  dispatch,
  defaultState
) => {
  const onAddById = React.useCallback(
    id =>
      dispatch({
        type: ADD_BY_ID,
        payload: { id }
      }),
    [dispatch]
  );

  const onRemoveById = React.useCallback(
    id =>
      dispatch({
        type: REMOVE_BY_ID,
        payload: { id }
      }),
    [dispatch]
  );

  const onToggleById = React.useCallback(
    id => (state.ids.includes(id) ? onRemoveById(id) : onAddById(id)),
    [state, onAddById, onRemoveById]
  );

  const onAddByIdRecursively = React.useCallback(
    ids => {
      dispatch({
        type: ADD_BY_ID_RECURSIVELY,
        payload: { ids }
      });
    },
    [dispatch]
  );

  const onRemoveByIdRecursively = React.useCallback(
    ids => {
      dispatch({
        type: REMOVE_BY_ID_RECURSIVELY,
        payload: { ids }
      });
    },
    [dispatch]
  );

  const onToggleByIdRecursively = React.useCallback(
    id => {
      const ids = findItemsById(data.nodes, id).map(item => item.id);

      if (isAll(ids, state.ids)) {
        onRemoveByIdRecursively(ids);
      } else {
        onAddByIdRecursively(ids);
      }
    },
    [data, state, onAddByIdRecursively, onRemoveByIdRecursively]
  );

  const onAddAll = React.useCallback(
    ids => {
      dispatch({
        type: ADD_ALL,
        payload: { ids }
      });
    },
    [dispatch]
  );

  const onRemoveAll = React.useCallback(() => {
    dispatch({
      type: REMOVE_ALL
    });
  }, [dispatch]);

  const onToggleAll = React.useCallback(() => {
    const ids = findAllItems(data.nodes).map(item => item.id);

    if (isAll(ids, state.ids)) {
      onRemoveAll();
    } else {
      onAddAll(ids);
    }
  }, [data, state, onAddAll, onRemoveAll]);

  const onSet = React.useCallback(
    value =>
      dispatch({
        type: SET,
        payload: value
      }),
    [dispatch]
  );

  const defaultStatePrevious = usePrevious(defaultState);

  React.useEffect(() => {
    if (!isEqual(defaultState, defaultStatePrevious)) {
      onSet(defaultState);
    }
  }, [defaultStatePrevious, defaultState, onSet]);

  const none = !state.ids.length;

  const all =
    data.nodes.length &&
    isAll(
      data.nodes.map(item => item.id),
      state.ids
    );

  return {
    onAddById,
    onRemoveById,
    onToggleById,

    onAddByIdRecursively,
    onRemoveByIdRecursively,
    onToggleByIdRecursively,

    onAddAll,
    onRemoveAll,
    onToggleAll,

    none,
    all
  };
};
