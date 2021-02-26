import * as React from 'react';
import isEqual from 'lodash.isequal';

const useSyncState = (incomingState, callback) => {
  const previousIncomingState = React.useRef(incomingState);
  React.useEffect(() => {
    if (!isEqual(previousIncomingState.current, incomingState)) {
      callback();

      previousIncomingState.current = incomingState;
    }
  }, [incomingState, callback]);
};

export { useSyncState };
