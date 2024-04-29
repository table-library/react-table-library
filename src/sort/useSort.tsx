import * as React from 'react';

import { useReducerWithMiddleware } from '@overmap-ai/react-table-library/common/util/useReducerWithMiddleware';
import { useSyncControlledState } from '@overmap-ai/react-table-library/common/util//useSyncControlledState';
import { useSyncRefState } from '@overmap-ai/react-table-library/common/util/useSyncRefState';
import IconChevronSingleDown from '@table-library/react-table-library/common/icons/IconChevronSingleDown';
import IconChevronSingleUp from '@table-library/react-table-library/common/icons/IconChevronSingleUp';
import IconChevronSingleUpDown from '@table-library/react-table-library/common/icons/IconChevronSingleUpDown';

import { Action, State, StateAndChange } from '@table-library/react-table-library/types/common';
import { Data, ExtendedNode, TableNode } from '@table-library/react-table-library/types/table';
import {
  Sort,
  SortOptions,
  SortIconPositions,
  SortToggleType,
} from '@table-library/react-table-library/types/sort';

import { HeaderCellSort } from './HeaderCellSort';

const TOGGLE_SORT = 'TOGGLE_SORT';
const SET = 'SET';

const toggleSort = (state: State, action: Action) => {
  const isPreviousSort = action.payload.value.sortKey === state.sortKey;
  const isPreviousReverse = state.reverse;

  if (
    isPreviousSort &&
    isPreviousReverse &&
    action.payload.options.sortToggleType === SortToggleType.AlternateWithReset
  ) {
    return {
      sortKey: 'NONE',
      reverse: false,
    };
  }

  const isReverse = isPreviousSort && !isPreviousReverse;

  return {
    ...action.payload.value,
    reverse: isReverse,
  };
};

const set = (state: State, action: Action) => ({
  ...state,
  ...action.payload,
});

const reducer = (state: State, action: Action) => {
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
  position: SortIconPositions.Suffix,
  margin: '4px',
  size: '14px',
  iconDefault: <IconChevronSingleUpDown />,
  iconUp: <IconChevronSingleUp />,
  iconDown: <IconChevronSingleDown />,
};

const DEFAULT_OPTIONS = {
  isServer: false,
  sortToggleType: SortToggleType.Alternate,
  sortIcon: DEFAULT_SORT_ICON,
  isRecursive: true,
};

const useSort = <T extends TableNode>(
  data: Data<T>,
  primary: StateAndChange,
  options: SortOptions,
  context?: any,
): Sort<T> => {
  const controlledState: State = {
    ...DEFAULT_STATE,
    ...(primary.state ?? {}),
  };

  const onChange = primary?.onChange ? primary.onChange : () => {};

  const [state, dispatchWithMiddleware] = useReducerWithMiddleware(
    reducer,
    controlledState,
    [],
    [onChange],
    context,
  );

  const onToggleSort = React.useCallback(
    (value) =>
      dispatchWithMiddleware({
        type: TOGGLE_SORT,
        payload: { value, options },
      }),
    [options, dispatchWithMiddleware],
  );

  useSyncControlledState(controlledState, state, () =>
    dispatchWithMiddleware({
      type: SET,
      payload: controlledState,
    }),
  );

  const sortFn = React.useCallback(
    (nodes, sortFns, isRecursive) => {
      const sortFnCurrent = sortFns[state.sortKey];

      const sortFnWithFallback = sortFnCurrent || ((_nodes: TableNode[]) => _nodes);

      const sortFnReverse = state.reverse
        ? (_nodes: TableNode[]) => sortFnWithFallback(_nodes).reverse()
        : sortFnWithFallback;

      return sortFnReverse(nodes).reduce((acc: TableNode[], value: TableNode) => {
        if (isRecursive && value.nodes) {
          return acc.concat({
            ...value,
            nodes: sortFn(value.nodes, sortFns, isRecursive),
          });
        }

        return acc.concat(value);
      }, []);
    },
    [state],
  );

  const fns = React.useMemo(
    () => ({
      onToggleSort,
    }),
    [onToggleSort],
  );

  useSyncRefState('sort', context, state);

  const mergedOptions = {
    ...DEFAULT_OPTIONS,
    ...options,
    sortIcon: {
      ...DEFAULT_SORT_ICON,
      ...(options ? options.sortIcon : {}),
    },
  };

  const stateAndGetters = { ...state, sortFn };

  const modifier = (nodes: T[]): ExtendedNode<T>[] => {
    if (mergedOptions.isServer) {
      return nodes;
    }

    return stateAndGetters.sortFn(nodes, mergedOptions.sortFns, mergedOptions.isRecursive);
  };

  return {
    state: stateAndGetters,
    fns,
    options: mergedOptions,
    modifier,
    components: {
      HeaderCellSort,
    },
  };
};

export { useSort };
