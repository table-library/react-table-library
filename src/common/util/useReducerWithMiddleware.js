import * as React from 'react';

const useReducerWithMiddleware = (
  myreducer,
  initialState,
  middlewareFns,
  afterwareFns
) => {
  const [state, dispatch] = React.useReducer(myreducer, initialState);

  const aRef = React.useRef();

  const dispatchWithMiddleware = action => {
    middlewareFns.forEach(middlewareFn =>
      middlewareFn(action, state)
    );

    aRef.current = action;

    dispatch(action);
  };

  React.useEffect(() => {
    if (!aRef.current) return;

    afterwareFns.forEach(afterwareFn =>
      afterwareFn(aRef.current, state)
    );
  }, [afterwareFns, state]);

  return [state, dispatchWithMiddleware];
};

export { useReducerWithMiddleware };
