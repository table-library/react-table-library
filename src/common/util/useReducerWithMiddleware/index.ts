import * as React from 'react';

import { State, Action, MiddlewareFunction } from '@table-library/react-table-library/types/common';

const useReducerWithMiddleware = (
  reducer: (state: State, action: Action) => State,
  controlledState: State,
  middlewareFns: MiddlewareFunction[],
  afterwareFns: MiddlewareFunction[],
  context: any,
): [State, (action: Action) => void] => {
  const [state, dispatch] = React.useReducer(reducer, controlledState);

  const aRef = React.useRef<Action | null>(null);

  const dispatchWithMiddleware = (action: Action) => {
    middlewareFns.forEach((middlewareFn) =>
      middlewareFn(action, state, context ? context.current : undefined),
    );

    aRef.current = action;

    dispatch(action);
  };

  React.useEffect(() => {
    if (!aRef.current) return;

    afterwareFns.forEach((afterwareFn) =>
      afterwareFn(aRef.current!, state, context ? context.current : undefined),
    );

    aRef.current = null;
  }, [context, afterwareFns, state]);

  return [state, dispatchWithMiddleware];
};

export { useReducerWithMiddleware };
