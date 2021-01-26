import * as React from 'react';

import { useReducerWithMiddleware } from '@common/util/useReducerWithMiddleware';

const TOGGLE_SORT = 'TOGGLE_SORT';

const reducer = (state, action) => {
  switch (action.type) {
    case TOGGLE_SORT: {
      const needsReverse =
        action.payload.sortKey === state.sortKey && !state.reverse;

      return needsReverse
        ? {
            ...action.payload,
            sortFn: array => action.payload.sortFn(array).reverse(),
            reverse: true
          }
        : { ...action.payload, reverse: false };
    }
    default:
      throw new Error();
  }
};

const DEFAULT_STATE = {
  sortKey: 'NONE',
  sortFn: array => array,
  reverse: false
};

const useSort = (
  // eslint-disable-next-line no-unused-vars
  { data, initialState = DEFAULT_STATE, onChange },
  options = {}
) => {
  const [state, dispatchWithMiddleware] = useReducerWithMiddleware(
    reducer,
    initialState,
    [],
    [onChange]
  );

  const onToggleSort = React.useCallback(
    value =>
      dispatchWithMiddleware({
        type: TOGGLE_SORT,
        payload: value
      }),
    [dispatchWithMiddleware]
  );

  const fns = {
    onToggleSort
  };

  const tableProps = { sort: { state, fns, options } };

  return [state, fns, tableProps];
};

export { useSort };
