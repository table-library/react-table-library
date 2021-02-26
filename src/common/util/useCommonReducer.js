import * as React from 'react';
import isEqual from 'lodash.isequal';

import {
  findNodeById,
  fromNodesToList,
  includesAll,
} from '@table-library/react-table-library/lib/common/util/tree';

import { useReducerWithMiddleware } from '@table-library/react-table-library/lib/common/util/useReducerWithMiddleware';

const addById = (state, action) => {
  return {
    ...state,
    ids: state.ids.concat(action.payload.id),
  };
};

const removeById = (state, action) => {
  return {
    ...state,
    ids: state.ids.filter((id) => id !== action.payload.id),
  };
};

const addByIds = (state, action) => {
  return {
    ...state,
    ids: state.ids.concat(action.payload.ids),
  };
};

const removeByIds = (state, action) => {
  return {
    ...state,
    ids: state.ids.filter((id) => !action.payload.ids.includes(id)),
  };
};

const addAll = (state, action) => {
  return {
    ...state,
    ids: [...new Set([...state.ids, ...action.payload.ids])],
  };
};

const removeAll = (state) => {
  return {
    ...state,
    ids: [],
  };
};

const ADD_BY_ID = 'ADD_BY_ID';
const REMOVE_BY_ID = 'REMOVE_BY_ID';
const ADD_BY_ID_RECURSIVELY = 'ADD_BY_ID_RECURSIVELY';
const REMOVE_BY_ID_RECURSIVELY = 'REMOVE_BY_ID_RECURSIVELY';
const ADD_ALL = 'ADD_ALL';
const REMOVE_ALL = 'REMOVE_ALL';
const SET = 'SET';

const reducer = (state, action) => {
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

const useCommonReducer = (data, initialState, onChange) => {
  const [state, dispatchWithMiddleware] = useReducerWithMiddleware(
    reducer,
    initialState,
    [],
    [onChange]
  );

  const onAddById = React.useCallback(
    (id) =>
      dispatchWithMiddleware({
        type: ADD_BY_ID,
        payload: { id },
      }),
    [dispatchWithMiddleware]
  );

  const onRemoveById = React.useCallback(
    (id) =>
      dispatchWithMiddleware({
        type: REMOVE_BY_ID,
        payload: { id },
      }),
    [dispatchWithMiddleware]
  );

  const onToggleById = React.useCallback(
    (id) =>
      state.ids.includes(id) ? onRemoveById(id) : onAddById(id),
    [state, onAddById, onRemoveById]
  );

  const onAddByIdRecursively = React.useCallback(
    (ids) => {
      dispatchWithMiddleware({
        type: ADD_BY_ID_RECURSIVELY,
        payload: { ids },
      });
    },
    [dispatchWithMiddleware]
  );

  const onRemoveByIdRecursively = React.useCallback(
    (ids) => {
      dispatchWithMiddleware({
        type: REMOVE_BY_ID_RECURSIVELY,
        payload: { ids },
      });
    },
    [dispatchWithMiddleware]
  );

  const onToggleByIdRecursively = React.useCallback(
    (id) => {
      const node = findNodeById(data.nodes, id);

      const ids = [node, ...fromNodesToList(node.nodes)].map(
        (item) => item.id
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
    (ids) => {
      dispatchWithMiddleware({
        type: ADD_ALL,
        payload: { ids },
      });
    },
    [dispatchWithMiddleware]
  );

  const onRemoveAll = React.useCallback(() => {
    dispatchWithMiddleware({
      type: REMOVE_ALL,
    });
  }, [dispatchWithMiddleware]);

  const onToggleAll = React.useCallback(() => {
    const ids = fromNodesToList(data.nodes).map((item) => item.id);

    if (includesAll(ids, state.ids)) {
      onRemoveAll();
    } else {
      onAddAll(ids);
    }
  }, [data, state, onAddAll, onRemoveAll]);

  const previousInitialState = React.useRef(initialState);
  React.useEffect(() => {
    if (!isEqual(previousInitialState.current, initialState)) {
      dispatchWithMiddleware({
        type: SET,
        payload: initialState,
      });

      previousInitialState.current = initialState;
    }
  }, [dispatchWithMiddleware, initialState]);

  const none = !state.ids.length;

  const all =
    !!data.nodes.length &&
    includesAll(
      data.nodes.map((item) => item.id),
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
    onToggleAll,
  };

  return [{ ...state, none, all }, fns];
};

export { useCommonReducer };
