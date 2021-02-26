import * as React from 'react';

import { useReducerWithMiddleware } from '@table-library/react-table-library/lib/common/util/useReducerWithMiddleware';

import { useSyncState } from '@table-library/react-table-library/lib/common/util//useSyncState';

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

const useSort = (primary = {}, options = {}) => {
  const incomingState = primary.state || DEFAULT_STATE;
  const onChange = primary.onChange || (() => {});

  const [state, dispatchWithMiddleware] = useReducerWithMiddleware(
    reducer,
    incomingState,
    [],
    [onChange]
  );

  const onToggleSort = React.useCallback(
    (value) =>
      dispatchWithMiddleware({
        type: TOGGLE_SORT,
        payload: value,
      }),
    [dispatchWithMiddleware]
  );

  useSyncState(incomingState, () =>
    dispatchWithMiddleware({
      type: SET,
      payload: incomingState,
    })
  );

  const fns = {
    onToggleSort,
  };

  const mergedOptions = {
    ...DEFAULT_OPTIONS,
    ...options,
  };

  return { state, fns, _options: mergedOptions };
};

export { useSort };
