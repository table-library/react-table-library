import * as React from 'react';

import { TableContext } from './Table';

const useReducerWithNotify = (
  reducer,
  initialState,
  key,
  stateKey
) => {
  const { tableFeatureRef, onTableStateChange } = React.useContext(
    TableContext
  );

  const [state, dispatch] = React.useReducer(reducer, initialState);

  const isMount = React.useRef(false);
  const aRef = React.useRef(null);

  const dispatchWithMiddleware = React.useCallback(action => {
    aRef.current = action;

    dispatch(action);
  }, []);

  React.useEffect(() => {
    if (!isMount.current) {
      isMount.current = true;
      return;
    }

    if (!onTableStateChange) return;
    if (!aRef.current) return;

    const globalState = {
      ...tableFeatureRef.current,
      [key]: {
        ...tableFeatureRef.current[key],
        [stateKey]: state
      }
    };

    onTableStateChange(key, globalState, aRef.current);

    // action should be only used once to notify
    aRef.current = null;
  }, [key, stateKey, state, tableFeatureRef, onTableStateChange]);

  return [state, dispatchWithMiddleware];
};

export { useReducerWithNotify };
