import * as React from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash.isequal';

const TOGGLE_SORT = 'TOGGLE_SORT';
const SET_SORT = 'SET_SORT';

const sortReducer = (state, action) => {
  switch (action.type) {
    case TOGGLE_SORT: {
      const needsReverse =
        action.payload.key === state.key && !state.reverse;

      return needsReverse
        ? {
            ...action.payload,
            reverse: true,
            fn: array => action.payload.fn(array).reverse()
          }
        : { ...action.payload, reverse: false };
    }
    case SET_SORT: {
      const { fn, ...rest } = action.payload;
      const { fn: stateFn, ...stateRest } = state;

      const isSame =
        fn.toString() === stateFn.toString() &&
        isEqual(rest, stateRest);

      if (isSame) return state;

      return { ...state, ...action.payload };
    }
    default:
      throw new Error();
  }
};

const SortContext = React.createContext({});

const DEFAULT_SORT = {
  key: 'none',
  reverse: false,
  fn: array => array
};

const SortProvider = ({ defaultSort = DEFAULT_SORT, children }) => {
  const [sortState, sortStateDispatcher] = React.useReducer(
    sortReducer,
    defaultSort
  );

  const onToggleSort = React.useCallback(
    value =>
      sortStateDispatcher({
        type: TOGGLE_SORT,
        payload: value
      }),
    []
  );

  const onSetSort = React.useCallback(
    value =>
      sortStateDispatcher({
        type: SET_SORT,
        payload: value
      }),
    []
  );

  React.useEffect(() => {
    onSetSort(defaultSort);
  }, [defaultSort, onSetSort]);

  return (
    <SortContext.Provider
      value={{ sortState, onToggleSort, onSetSort }}
    >
      {children}
    </SortContext.Provider>
  );
};

SortProvider.propTypes = {
  defaultSort: PropTypes.shape({
    key: PropTypes.string,
    reverse: PropTypes.bool,
    fn: PropTypes.func
  }),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func
  ])
};

export { SortContext, SortProvider };
