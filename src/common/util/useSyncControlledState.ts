import * as React from 'react';

import { State } from '@overmap-ai/react-table-library/types/common';

// order of keys must be the same
// no functions in object allowed
const isEqual = (a: any, b: any) => JSON.stringify(a) === JSON.stringify(b);

const useSyncControlledState = (controlledState: State, state: State, callback: () => void) => {
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
