import * as React from 'react';

const useSyncRefState = (name, context, state) => {
  React.useEffect(() => {
    if (!context) return;

    context.current[name] = {
      state,
    };
  }, [context, name, state]);
};

export { useSyncRefState };
