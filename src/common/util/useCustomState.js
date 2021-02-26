import { useReducerWithMiddleware } from './useReducerWithMiddleware';
import { useSyncState } from './useSyncState';

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

const useCustomState = (primary = {}) => {
  const incomingState = primary.state || DEFAULT_STATE;
  const onChange = primary.onChange || (() => {});

  const [state, dispatchWithMiddleware] = useReducerWithMiddleware(
    reducer,
    incomingState,
    [],
    [onChange]
  );

  useSyncState(incomingState, () =>
    dispatchWithMiddleware({
      type: SET,
      payload: incomingState,
    })
  );

  return state;
};

export { useCustomState };
