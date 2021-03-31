import * as React from 'react';

import { useReducerWithMiddleware } from '@table-library/react-table-library/common/util/useReducerWithMiddleware';
import { useSyncControlledState } from '@table-library/react-table-library/common/util//useSyncControlledState';
import { useSyncRefState } from '@table-library/react-table-library/common/util/useSyncRefState';

const SET = 'SET';

const set = (state, action) => ({ ...state, ...action.payload });

const reducer = (state, action) => {
  switch (action.type) {
    case SET: {
      return set(state, action);
    }
    default:
      throw new Error();
  }
};

const DEFAULT_STATE = {
  page: 0,
  size: 10,
};

const DEFAULT_OPTIONS = {
  isServer: false,
};

const usePagination = (data, primary = {}, options = {}, context) => {
  const primaryNullFallback = primary || {};
  const controlledState = {
    ...DEFAULT_STATE,
    ...primaryNullFallback.state,
  };
  const onChange = primaryNullFallback.onChange || (() => {});

  const [state, dispatchWithMiddleware] = useReducerWithMiddleware(
    reducer,
    controlledState,
    [],
    [onChange],
    context
  );

  const onSetPage = React.useCallback(
    (value) =>
      dispatchWithMiddleware({
        type: SET,
        payload: { page: value },
      }),
    [dispatchWithMiddleware]
  );

  const onSetSize = React.useCallback(
    (value) =>
      dispatchWithMiddleware({
        type: SET,
        payload: { size: value, page: 0 },
      }),
    [dispatchWithMiddleware]
  );

  useSyncControlledState(controlledState, state, () =>
    dispatchWithMiddleware({
      type: SET,
      payload: controlledState,
    })
  );

  const getTotalPages = React.useCallback(
    (nodes) => Math.ceil(nodes.length / state.size),
    [state.size]
  );

  const getPages = React.useCallback(
    (nodes) =>
      nodes.reduce((acc, item, index) => {
        const sizeIndex = Math.floor(index / state.size);

        if (!acc[sizeIndex]) {
          acc[sizeIndex] = [];
        }

        acc[sizeIndex].push(item);

        return acc;
      }, []),
    [state.size]
  );

  const getPageBoundaries = React.useCallback(
    (nodes) => {
      const start = state.page * state.size + 1;
      const end = state.page * state.size + state.size;

      return {
        start,
        end: end > nodes.length ? nodes.length : end,
      };
    },
    [state.page, state.size]
  );

  const fns = React.useMemo(
    () => ({
      onSetPage,
      onSetSize,
    }),
    [onSetPage, onSetSize]
  );

  useSyncRefState('pagination', context, state);

  const mergedOptions = {
    ...DEFAULT_OPTIONS,
    ...options,
  };

  return {
    state: { ...state, getTotalPages, getPages, getPageBoundaries },
    fns,
    _options: mergedOptions,
  };
};

export { usePagination };
