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

const DEFAULT_SORT_ICON = {
  position: SORT_ICON_POSITIONS.Suffix,
  margin: '4px',
  size: '14px',
  iconDefault: <IconChevronSingleUpDown />,
  iconUp: <IconChevronSingleUp />,
  iconDown: <IconChevronSingleDown />,
};

const DEFAULT_OPTIONS = {
  sortIcon: DEFAULT_SORT_ICON,
  isServer: false,
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

  return { state, fns, _options: mergedOptions };
};

export { useSort };
