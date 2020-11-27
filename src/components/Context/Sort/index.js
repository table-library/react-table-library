import * as React from 'react';
import PropTypes from 'prop-types';

const SET_SORT = 'SET_SORT';

const sortReducer = (state, action) => {
  switch (action.type) {
    case SET_SORT: {
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
    default:
      throw new Error();
  }
};

const SortContext = React.createContext({});

const DEFAULT_SORT = {
  key: null,
  reverse: false,
  fn: array => array
};

const SortProvider = ({ defaultSort = DEFAULT_SORT, children }) => {
  const [sortState, sortStateDispatcher] = React.useReducer(
    sortReducer,
    defaultSort
  );

  const onSort = value =>
    sortStateDispatcher({
      type: SET_SORT,
      payload: value
    });

  return (
    <SortContext.Provider value={{ sortState, onSort }}>
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
  children: PropTypes.func.isRequired
};

export { SortContext, SortProvider };
