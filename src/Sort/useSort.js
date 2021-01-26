import * as React from 'react';

const TOGGLE_SORT = 'TOGGLE_SORT';

const reducer = (state, action) => {
  switch (action.type) {
    case TOGGLE_SORT: {
      const needsReverse =
        action.payload.sortKey === state.sortKey && !state.reverse;

      return needsReverse
        ? {
            ...action.payload,
            sortFn: array => action.payload.sortFn(array).reverse(),
            reverse: true
          }
        : { ...action.payload, reverse: false };
    }
    default:
      throw new Error();
  }
};

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

const DEFAULT_STATE = {
  sortKey: 'NONE',
  sortFn: array => array,
  reverse: false
};

const useSort = ({ state: initialState, onChange }, options = {}) => {
  const [state, dispatchWithMiddleware] = useReducerWithMiddleware(
    reducer,
    initialState || DEFAULT_STATE,
    [],
    [onChange]
  );

  const onToggleSort = React.useCallback(
    value =>
      dispatchWithMiddleware({
        type: TOGGLE_SORT,
        payload: value
      }),
    [dispatchWithMiddleware]
  );

  const fns = {
    onToggleSort
  };

  const tableProps = { sort: { state, fns, options } };

  return [state, fns, tableProps];
};

export { useSort };
