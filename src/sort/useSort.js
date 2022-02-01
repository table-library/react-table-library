import * as React from 'react';

import { useReducerWithMiddleware } from '@table-library/react-table-library/common/util/useReducerWithMiddleware';
import { useSyncControlledState } from '@table-library/react-table-library/common/util//useSyncControlledState';
import { useSyncRefState } from '@table-library/react-table-library/common/util/useSyncRefState';
import IconChevronSingleDown from '@table-library/react-table-library/common/icons/IconChevronSingleDown';
import IconChevronSingleUp from '@table-library/react-table-library/common/icons/IconChevronSingleUp';
import IconChevronSingleUpDown from '@table-library/react-table-library/common/icons/IconChevronSingleUpDown';

import { SORT_ICON_POSITIONS } from './config';

const TOGGLE_SORT = 'TOGGLE_SORT';
const SET = 'SET';

const toggleSort = (state, action) => {
  const reverse =
    action.payload.sortKey === state.sortKey && !state.reverse;

  return {
    ...action.payload,
    reverse,
  };
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
  reverse: false,
};

const DEFAULT_SORT_ICON = {
  position: SORT_ICON_POSITIONS.Suffix,
  margin: '4px',
  size: '14px',
  iconDefault: <IconChevronSingleUpDown />,
  iconUp: <IconChevronSingleUp />,
  iconDown: <IconChevronSingleDown />,
};

const DEFAULT_OPTIONS = {
  isServer: false,
  sortIcon: DEFAULT_SORT_ICON,
  isRecursive: true,
};

const useSort = (data, primary = {}, options = {}, context) => {
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

  const sortFn = React.useCallback(
    (nodes, sortFns, isRecursive) => {
      const sortFnCurrent = sortFns[state.sortKey];

      const sortFnWithFallback = sortFnCurrent || ((array) => array);

      const sortFnReverse = state.reverse
        ? (array) => sortFnWithFallback(array).reverse()
        : sortFnWithFallback;

      return sortFnReverse(nodes).reduce((acc, value) => {
        if (isRecursive && value.nodes) {
          return acc.concat({
            ...value,
            nodes: sortFn(value.nodes, sortFns, isRecursive),
          });
        }

        return acc.concat(value);
      }, []);
    },
    [state]
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
    sortIcon: {
      ...DEFAULT_SORT_ICON,
      ...options.sortIcon,
    },
  };

  const stateAndGetters = { ...state, sortFn };

  const _modifier = (nodes) => {
    if (mergedOptions.isServer) {
      return nodes;
    }

    return stateAndGetters.sortFn(
      nodes,
      mergedOptions.sortFns,
      mergedOptions.isRecursive
    );
  };

  return {
    state: stateAndGetters,
    fns,
    _options: mergedOptions,
    _modifier,
  };
};

export { useSort };
