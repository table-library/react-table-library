import { useSyncRefState } from '@table-library/react-table-library/common/util/useSyncRefState';
import { useReducerWithMiddleware } from '@table-library/react-table-library/common/util/useReducerWithMiddleware';
import { useSyncControlledState } from '@table-library/react-table-library/common/util/useSyncControlledState';

const set = (state, action) => ({ ...state, ...action.payload });

const SET = 'SET';

const reducer = (state, action) => {
  switch (action.type) {
    case SET: {
      return set(state, action);
    }
    default:
      throw new Error();
  }
};

const DEFAULT_STATE = {};

const useCustom = (name, data, primary = {}, context) => {
  const controlledState = primary.state || DEFAULT_STATE;
  const onChange = primary.onChange || (() => {});

  const [state, dispatchWithMiddleware] = useReducerWithMiddleware(
    reducer,
    controlledState,
    [],
    [onChange],
    context
  );

  useSyncControlledState(controlledState, state, () =>
    dispatchWithMiddleware({
      type: SET,
      payload: controlledState,
    })
  );

  useSyncRefState(name, context, state);

  return state;
};

export { useCustom };
