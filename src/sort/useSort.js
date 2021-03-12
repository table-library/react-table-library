import * as React from 'react';

import { useReducerWithMiddleware } from '@table-library/react-table-library/common/util/useReducerWithMiddleware';
import { useSyncControlledState } from '@table-library/react-table-library/common/util//useSyncControlledState';
import { useSyncRefState } from '@table-library/react-table-library/common/util/useSyncRefState';

const TOGGLE_SORT = 'TOGGLE_SORT';
const SET = 'SET';

const toggleSort = (state, action) => {
  const needsReverse =
    action.payload.sortKey === state.sortKey && !state.reverse;

  return needsReverse
    ? {
        ...action.payload,
        sortFn: (array) => action.payload.sortFn(array).reverse(),
        reverse: true,
      }
    : { ...action.payload, reverse: false };
};

const set = (state, action) => ({ ...state, ...action.payload });

const reducer = (state, action) => {
  switch (action.type) {
    case TOGGLE_SORT: {
      return toggleSort(state, action);
    }
    case SET: {
      return set(state, action);
    }
    default:
      throw new Error();
  }
};

const DEFAULT_STATE = {
  sortKey: 'NONE',
  sortFn: (array) => array,
  reverse: false,
};

const DEFAULT_OPTIONS = {
  isServer: false,
};

const useSort = (data, primary = {}, options = {}, context) => {
  const controlledState = { ...DEFAULT_STATE, ...primary.state };
  const onChange = primary.onChange || (() => {});

  const [state, dispatchWithMiddleware] = useReducerWithMiddleware(
    reducer,
    controlledState,
    [],
    [onChange],
    context
  );

  const onToggleSort = React.useCallback(
    (value) =>
      dispatchWithMiddleware({
        type: TOGGLE_SORT,
        payload: value,
      }),
    [dispatchWithMiddleware]
  );

  useSyncControlledState(controlledState, state, () =>
    dispatchWithMiddleware({
      type: SET,
      payload: controlledState,
    })
  );

  const fns = React.useMemo(
    () => ({
      onToggleSort,
    }),
    [onToggleSort]
  );

  useSyncRefState('sort', context, state);

  const mergedOptions = {
    ...DEFAULT_OPTIONS,
    ...options,
  };

  return { state, fns, _options: mergedOptions };
};

export { useSort };
