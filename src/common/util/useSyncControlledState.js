import * as React from 'react';
import isEqual from 'lodash.isequal';

const useSyncControlledState = (controlledState, state, callback) => {
  const previousControlledState = React.useRef(controlledState);
  const previousState = React.useRef(controlledState);

  React.useEffect(() => {
    if (!isEqual(state, previousState.current)) {
      // do nothing, because it's a internal state change
    } else if (
      !isEqual(controlledState, previousControlledState.current) &&
      !isEqual(controlledState, state)
    ) {
      callback();
    }

    previousControlledState.current = controlledState;
    previousState.current = state;
  }, [state, callback, controlledState]);
};

export { useSyncControlledState };
