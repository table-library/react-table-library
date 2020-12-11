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

  const isMount = React.useRef();
  const aRef = React.useRef();

  const dispatchWithMiddleware = React.useCallback(action => {
    aRef.current = action;

    dispatch(action);
  }, []);

  React.useEffect(() => {
    if (!isMount.current) {
      isMount.current = true;
      return;
    }

    if (!aRef.current) return;

    const globalState = {
      ...tableFeatureRef.current,
      [key]: {
        ...tableFeatureRef.current[key],
        [stateKey]: state
      }
    };

    onTableStateChange(key, globalState);
  }, [key, stateKey, state, tableFeatureRef, onTableStateChange]);

  return [state, dispatchWithMiddleware];
};

export { useReducerWithNotify };
