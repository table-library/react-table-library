import * as React from 'react';
import isEqual from 'lodash.isequal';

import { State } from '@table-library/react-table-library/types/common';

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
