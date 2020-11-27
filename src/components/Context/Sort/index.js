import * as React from 'react';
import PropTypes from 'prop-types';

const SET_SORT = 'SET_SORT';

const sortReducer = (state, action) => {
  switch (action.type) {
    case SET_SORT: {
      const needsReverse =
        action.payload.sort.key === state.key && !state.reverse;

      return needsReverse
        ? {
            ...action.payload.sort,
            reverse: true,
            fn: array => action.payload.sort.fn(array).reverse()
          }
        : { ...action.payload.sort, reverse: false };
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
  const [sort, sortDispatcher] = React.useReducer(
    sortReducer,
    defaultSort
  );

  const setSort = value =>
    sortDispatcher({ type: SET_SORT, payload: { sort: value } });

  return (
    <SortContext.Provider value={{ sort, setSort }}>
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
