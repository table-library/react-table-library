import { useSyncRefState } from '@table-library/react-table-library/common/util/useSyncRefState';
import { useReducerWithMiddleware } from '@table-library/react-table-library/common/util/useReducerWithMiddleware';
import { useSyncControlledState } from '@table-library/react-table-library/common/util/useSyncControlledState';

import {
  State,
  Action,
  StateAndChange,
  Nullish,
} from '@table-library/react-table-library/types/common';
import { Data, TableNode } from '@table-library/react-table-library/types/table';

const set = (state: State, action: Action) => ({
  ...state,
  ...action.payload,
});

const SET = 'SET';

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case SET: {
      return set(state, action);
    }
    default:
      throw new Error();
  }
};

const DEFAULT_STATE = {};

const useCustom = <T extends TableNode>(
  name: string,
  data: Data<T>,
  primary: StateAndChange | Nullish,
  context?: any,
) => {
  const controlledState: State = primary?.state
    ? { ...DEFAULT_STATE, ...primary.state }
    : { ...DEFAULT_STATE };

  const onChange = primary?.onChange ? primary.onChange : () => {};

  const [state, dispatchWithMiddleware] = useReducerWithMiddleware(
    reducer,
    controlledState,
    [],
    [onChange],
    context,
  );

  useSyncControlledState(controlledState, state, () =>
    dispatchWithMiddleware({
      type: SET,
      payload: controlledState,
    }),
  );

  useSyncRefState(name, context, state);

  return state;
};

export { useCustom };
