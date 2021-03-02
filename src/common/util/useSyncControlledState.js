import * as React from 'react';
import isEqual from 'lodash.isequal';

const useSyncControlledState = (controlledState, state, callback) => {
  const previous = React.useRef(controlledState);

  React.useEffect(() => {
    if (
      !isEqual(controlledState, previous.current) &&
      !isEqual(controlledState, state)
    ) {
      callback();
    }

    if (!isEqual(controlledState, previous.current)) {
      previous.current = state;
    }
  }, [state, callback, controlledState]);
};

export { useSyncControlledState };
