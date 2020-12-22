import * as React from 'react';
import PropTypes from 'prop-types';

import { TableContext } from './Table';
import { useReducerWithNotify } from './useReducerWithNotify';
import { reducer, useCommonReducer } from './reducers';

const SelectContext = React.createContext({});

const DEFAULT_SELECT = {
  ids: []
};

const SelectProvider = ({
  defaultSelect = DEFAULT_SELECT,
  children
}) => {
  const { data } = React.useContext(TableContext);

  const [state, dispatch] = useReducerWithNotify(
    reducer,
    defaultSelect,
    'select',
    'selectState'
  );

  const { all, none, ...handler } = useCommonReducer(
    data,
    state,
    dispatch,
    defaultSelect
  );

  return (
    <SelectContext.Provider
      value={{
        selectState: {
          ...state,
          all,
          none
        },

        ...handler
      }}
    >
      {children}
    </SelectContext.Provider>
  );
};

SelectProvider.propTypes = {
  defaultSelect: PropTypes.shape({
    ids: PropTypes.arrayOf(PropTypes.string)
  }),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func
  ])
};

export { SelectContext, SelectProvider };
