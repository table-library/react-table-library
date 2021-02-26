import * as React from 'react';

const useReducerWithMiddleware = (
  reducer,
  incomingState,
  middlewareFns,
  afterwareFns
) => {
  const [state, dispatch] = React.useReducer(reducer, incomingState);

  const aRef = React.useRef();

  const dispatchWithMiddleware = (action) => {
    middlewareFns.forEach((middlewareFn) =>
      middlewareFn(action, state)
    );

    aRef.current = action;

    dispatch(action);
  };

  React.useEffect(() => {
    if (!aRef.current) return;

    afterwareFns.forEach((afterwareFn) =>
      afterwareFn(aRef.current, state)
    );

    aRef.current = null;
  }, [afterwareFns, state]);

  return [state, dispatchWithMiddleware];
};

export { useReducerWithMiddleware };
