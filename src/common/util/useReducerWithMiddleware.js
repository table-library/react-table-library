import * as React from 'react';

const useReducerWithMiddleware = (
  reducer,
  controlledState,
  middlewareFns,
  afterwareFns,
  context
) => {
  const [state, dispatch] = React.useReducer(
    reducer,
    controlledState
  );

  const aRef = React.useRef();

  const dispatchWithMiddleware = (action) => {
    middlewareFns.forEach((middlewareFn) =>
      middlewareFn(
        action,
        state,
        context ? context.current : undefined
      )
    );

    aRef.current = action;

    dispatch(action);
  };

  React.useEffect(() => {
    if (!aRef.current) return;

    afterwareFns.forEach((afterwareFn) =>
      afterwareFn(
        aRef.current,
        state,
        context ? context.current : undefined
      )
    );

    aRef.current = null;
  }, [context, afterwareFns, state]);

  return [state, dispatchWithMiddleware];
};

export { useReducerWithMiddleware };
