import * as React from 'react';

import { findNodeById } from '../tree/findNodeById';
import { fromTreeToList } from '../tree/fromTreeToList';
import { includesAll, includesNone } from '../tree/includesAll';
import { useSyncControlledState } from '../useSyncControlledState';
import { useReducerWithMiddleware } from '../useReducerWithMiddleware';

import {
  State,
  Action,
  MiddlewareFunction,
  IdReducerFunctions,
} from '@overmap-ai/react-table-library/types/common';
import { Data, TableNode } from '@overmap-ai/react-table-library/types/table';

const addById = (state: State, action: Action) => {
  return {
    ...state,
    id: null,
    ids: state.ids.concat(action.payload.id),
  };
};

const removeById = (state: State, action: Action) => {
  return {
    ...state,
    id: null,
    ids: state.ids.filter((id: string) => id !== action.payload.id),
  };
};

const addByIdRecursively = (state: State, action: Action) => {
  const ids =
    action.payload.options.isCarryForward && state.id != null
      ? [...Array.from(new Set(action.payload.ids.concat(state.id)))]
      : state.ids.concat(action.payload.ids);

  return {
    ...state,
    id: null,
    ids,
  };
};

const removeByIdRecursively = (state: State, action: Action) => {
  return {
    ...state,
    id: null,
    ids: state.ids.filter((id: string) => !action.payload.ids.includes(id)),
  };
};

const addByIdExclusively = (state: State, action: Action) => {
  return {
    ...state,
    id: action.payload.id,
    ids: [],
  };
};

const removeByIdExclusively = (state: State) => {
  return {
    ...state,
    id: null,
    ids: [],
  };
};

const addAll = (state: State, action: Action) => {
  return {
    ...state,
    id: null,
    ids: [...Array.from(new Set([...state.ids, ...action.payload.ids] as string[]))],
  };
};

const removeAll = (state: State) => {
  return {
    ...state,
    id: null,
    ids: [],
  };
};

const set = (state: State, action: Action) => ({
  ...state,
  ...action.payload,
});

const ADD_BY_ID = 'ADD_BY_ID';
const REMOVE_BY_ID = 'REMOVE_BY_ID';
const ADD_BY_IDS = 'ADD_BY_IDS';
const REMOVE_BY_IDS = 'REMOVE_BY_IDS';
const ADD_BY_ID_EXCLUSIVELY = 'ADD_BY_ID_EXCLUSIVELY';
const REMOVE_BY_ID_EXCLUSIVELY = 'REMOVE_BY_ID_EXCLUSIVELY';
const ADD_ALL = 'ADD_ALL';
const REMOVE_ALL = 'REMOVE_ALL';
const SET = 'SET';

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case ADD_BY_ID: {
      return addById(state, action);
    }
    case REMOVE_BY_ID: {
      return removeById(state, action);
    }
    case ADD_BY_IDS: {
      return addByIdRecursively(state, action);
    }
    case REMOVE_BY_IDS: {
      return removeByIdRecursively(state, action);
    }
    case ADD_BY_ID_EXCLUSIVELY: {
      return addByIdExclusively(state, action);
    }
    case REMOVE_BY_ID_EXCLUSIVELY: {
      return removeByIdExclusively(state);
    }
    case ADD_ALL: {
      return addAll(state, action);
    }
    case REMOVE_ALL: {
      return removeAll(state);
    }
    case SET: {
      return set(state, action);
    }
    default:
      throw new Error();
  }
};

const DEFAULT_OPTIONS = {
  isCarryForward: true,
  isPartialToAll: false,
};

const getMergedOptions = (options: Record<string, any>) => ({
  ...DEFAULT_OPTIONS,
  ...options,
});

const getRecursiveIds = (id: string, nodes: TableNode[]) => {
  const node = findNodeById(nodes, id);

  return [node, ...fromTreeToList(node?.nodes)].map((item) => item!.id);
};

const useIdReducer = <T extends TableNode>(
  data: Data<T>,
  controlledState: State,
  onChange: MiddlewareFunction,
  context: any,
): [State, IdReducerFunctions<T>] => {
  const [state, dispatchWithMiddleware] = useReducerWithMiddleware(
    reducer,
    controlledState,
    [],
    [onChange],
    context,
  );

  // exclusive for select feature
  const shiftToggle = React.useRef({
    lastToggledId: null,
    currentShiftIds: [],
  });

  const none = !state.ids.length;

  const all =
    !!data.nodes.length &&
    includesAll(
      data.nodes.map((item: TableNode) => item.id),
      state.ids,
    );

  const onAddById = React.useCallback(
    (id) =>
      dispatchWithMiddleware({
        type: ADD_BY_ID,
        payload: { id },
      }),
    [dispatchWithMiddleware],
  );

  const onRemoveById = React.useCallback(
    (id) =>
      dispatchWithMiddleware({
        type: REMOVE_BY_ID,
        payload: { id },
      }),
    [dispatchWithMiddleware],
  );

  const onToggleById = React.useCallback(
    (id) => {
      if (state.ids.includes(id)) {
        onRemoveById(id);
      } else {
        onAddById(id);
      }

      shiftToggle.current.lastToggledId = id;
      shiftToggle.current.currentShiftIds = [];
    },
    [state, onAddById, onRemoveById],
  );

  const onAddByIds = React.useCallback(
    (ids, options) => {
      const mergedOptions = getMergedOptions(options);

      dispatchWithMiddleware({
        type: ADD_BY_IDS,
        payload: {
          ids,
          options: mergedOptions,
        },
      });
    },
    [dispatchWithMiddleware],
  );

  const onRemoveByIds = React.useCallback(
    (ids) => {
      dispatchWithMiddleware({
        type: REMOVE_BY_IDS,
        payload: { ids },
      });
    },
    [dispatchWithMiddleware],
  );

  const onToggleByIdRecursively = React.useCallback(
    (id, options) => {
      const mergedOptions = getMergedOptions(options);

      const ids = getRecursiveIds(id, data.nodes);

      if (!mergedOptions.isPartialToAll) {
        if (includesNone(ids, state.ids)) {
          onAddByIds(ids, mergedOptions);
        } else {
          onRemoveByIds(ids);
        }
      }

      if (mergedOptions.isPartialToAll) {
        if (includesAll(ids, state.ids)) {
          onRemoveByIds(ids);
        } else {
          onAddByIds(ids, mergedOptions);
        }
      }

      shiftToggle.current.lastToggledId = id;
      shiftToggle.current.currentShiftIds = [];
    },
    [data.nodes, state.ids, onAddByIds, onRemoveByIds],
  );

  const onAddByIdRecursively = React.useCallback(
    (id, options) => {
      const mergedOptions = getMergedOptions(options);

      const ids = getRecursiveIds(id, data.nodes);

      onAddByIds(ids, mergedOptions);
    },
    [data.nodes, onAddByIds],
  );

  const onRemoveByIdRecursively = React.useCallback(
    (id) => {
      const ids = getRecursiveIds(id, data.nodes);

      onRemoveByIds(ids);
    },
    [data.nodes, onRemoveByIds],
  );

  const onAddByIdExclusively = React.useCallback(
    (id) => {
      dispatchWithMiddleware({
        type: ADD_BY_ID_EXCLUSIVELY,
        payload: { id },
      });
    },
    [dispatchWithMiddleware],
  );

  const onRemoveByIdExclusively = React.useCallback(() => {
    dispatchWithMiddleware({
      type: REMOVE_BY_ID_EXCLUSIVELY,
    });
  }, [dispatchWithMiddleware]);

  const onToggleByIdExclusively = React.useCallback(
    (id) => {
      if (id === state.id) {
        onRemoveByIdExclusively();
      } else {
        onAddByIdExclusively(id);
      }

      shiftToggle.current.lastToggledId = id;
      shiftToggle.current.currentShiftIds = [];
    },
    [state, onRemoveByIdExclusively, onAddByIdExclusively],
  );

  const onAddAll = React.useCallback(
    (ids) => {
      dispatchWithMiddleware({
        type: ADD_ALL,
        payload: { ids },
      });
    },
    [dispatchWithMiddleware],
  );

  const onRemoveAll = React.useCallback(() => {
    dispatchWithMiddleware({
      type: REMOVE_ALL,
    });
  }, [dispatchWithMiddleware]);

  const onToggleAll = React.useCallback(
    (options) => {
      const mergedOptions = getMergedOptions(options);

      const ids = fromTreeToList(data.nodes).map((item: TableNode) => item.id);

      if (!mergedOptions.isPartialToAll) {
        if (none) {
          onAddAll(ids);
        } else {
          onRemoveAll();
        }
      }

      if (mergedOptions.isPartialToAll) {
        if (all) {
          onRemoveAll();
        } else {
          onAddAll(ids);
        }
      }
    },
    [data.nodes, none, onAddAll, onRemoveAll, all],
  );

  const onToggleByIdShift = React.useCallback(
    (id, options, modifier) => {
      const mergedOptions = getMergedOptions(options);

      if (shiftToggle.current.currentShiftIds.length) {
        onRemoveByIds(shiftToggle.current.currentShiftIds);
        shiftToggle.current.currentShiftIds = [];
      }

      const originId = shiftToggle.current.lastToggledId;
      const targetId = id;

      const ids = modifier(data.nodes).map((item: TableNode) => item.id);

      let originIndex = ids.findIndex((_id: string) => _id === originId);
      let targetIndex = ids.findIndex((_id: string) => _id === targetId);

      if (originIndex > targetIndex) {
        [originIndex, targetIndex] = [targetIndex, originIndex];
      }

      const newShiftIds = ids.slice(originIndex, targetIndex + 1);

      onAddByIds(newShiftIds, mergedOptions);
      shiftToggle.current.currentShiftIds = newShiftIds;
    },
    [data.nodes, onAddByIds, onRemoveByIds],
  );

  useSyncControlledState(controlledState, state, () =>
    dispatchWithMiddleware({
      type: SET,
      payload: controlledState,
    }),
  );

  const fns = React.useMemo(
    () => ({
      onAddById,
      onRemoveById,
      onToggleById,

      onAddByIds,
      onRemoveByIds,
      onToggleByIdRecursively,

      onAddByIdRecursively,
      onRemoveByIdRecursively,

      onAddByIdExclusively,
      onRemoveByIdExclusively,
      onToggleByIdExclusively,

      onToggleByIdShift,

      onAddAll,
      onRemoveAll,
      onToggleAll,
    }),
    [
      onAddAll,
      onAddById,
      onAddByIds,
      onRemoveAll,
      onRemoveById,
      onRemoveByIds,
      onAddByIdExclusively,
      onRemoveByIdExclusively,
      onToggleByIdExclusively,
      onToggleAll,
      onToggleById,
      onToggleByIdRecursively,
      onToggleByIdShift,
      onAddByIdRecursively,
      onRemoveByIdRecursively,
    ],
  );

  return [{ ...state, none, all }, fns];
};

export { useIdReducer };
