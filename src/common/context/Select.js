import * as React from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash.isequal';

import { usePrevious } from '@common/util/usePrevious';
import {
  findItemsById,
  findAllItems,
  isAll
} from '@common/util/tree';

import { TableContext } from './Table';
import { useReducerWithNotify } from './useReducerWithNotify';
import {
  addById,
  addByIds,
  removeById,
  removeByIds,
  addAll,
  removeAll
} from './reducers';

const SELECT_ADD_BY_ID = 'SELECT_ADD_BY_ID';
const SELECT_REMOVE_BY_ID = 'SELECT_REMOVE_BY_ID';
const SELECT_ADD_BY_ID_RECURSIVELY = 'SELECT_ADD_BY_ID_RECURSIVELY';
const SELECT_REMOVE_BY_ID_RECURSIVELY =
  'SELECT_REMOVE_BY_ID_RECURSIVELY';
const SELECT_ADD_ALL = 'SELECT_ADD_ALL';
const SELECT_REMOVE_ALL = 'SELECT_REMOVE_ALL';
const SELECT_SET = 'SELECT_SET';

const selectReducer = (state, action) => {
  switch (action.type) {
    case SELECT_ADD_BY_ID: {
      return addById(state, action);
    }
    case SELECT_REMOVE_BY_ID: {
      return removeById(state, action);
    }
    case SELECT_ADD_BY_ID_RECURSIVELY: {
      return addByIds(state, action);
    }
    case SELECT_REMOVE_BY_ID_RECURSIVELY: {
      return removeByIds(state, action);
    }
    case SELECT_ADD_ALL: {
      return addAll(state, action);
    }
    case SELECT_REMOVE_ALL: {
      return removeAll(state, action);
    }

    case SELECT_SET: {
      return { ...state, ...action.payload };
    }
    default:
      throw new Error();
  }
};

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
    selectReducer,
    defaultSelect,
    'select',
    'selectState'
  );

  const onAddSelectById = React.useCallback(
    id =>
      dispatch({
        type: SELECT_ADD_BY_ID,
        payload: { id }
      }),
    [dispatch]
  );

  const onRemoveSelectById = React.useCallback(
    id =>
      dispatch({
        type: SELECT_REMOVE_BY_ID,
        payload: { id }
      }),
    [dispatch]
  );

  const onToggleSelectById = React.useCallback(
    id =>
      state.ids.includes(id)
        ? onRemoveSelectById(id)
        : onAddSelectById(id),
    [state, onAddSelectById, onRemoveSelectById]
  );

  const onAddSelectByIdRecursively = React.useCallback(
    ids => {
      dispatch({
        type: SELECT_ADD_BY_ID_RECURSIVELY,
        payload: { ids }
      });
    },
    [dispatch]
  );

  const onRemoveSelectByIdRecursively = React.useCallback(
    ids => {
      dispatch({
        type: SELECT_REMOVE_BY_ID_RECURSIVELY,
        payload: { ids }
      });
    },
    [dispatch]
  );

  const onToggleSelectByIdRecursively = React.useCallback(
    id => {
      const ids = findItemsById(data.nodes, id).map(item => item.id);

      if (isAll(ids, state.ids)) {
        onRemoveSelectByIdRecursively(ids);
      } else {
        onAddSelectByIdRecursively(ids);
      }
    },
    [
      data,
      state,
      onAddSelectByIdRecursively,
      onRemoveSelectByIdRecursively
    ]
  );

  const onAddSelectAll = React.useCallback(
    ids => {
      dispatch({
        type: SELECT_ADD_ALL,
        payload: { ids }
      });
    },
    [dispatch]
  );

  const onRemoveSelectAll = React.useCallback(() => {
    dispatch({
      type: SELECT_REMOVE_ALL
    });
  }, [dispatch]);

  const onToggleSelectAll = React.useCallback(() => {
    const ids = findAllItems(data.nodes).map(item => item.id);

    if (isAll(ids, state.ids)) {
      onRemoveSelectAll();
    } else {
      onAddSelectAll(ids);
    }
  }, [data, state, onAddSelectAll, onRemoveSelectAll]);

  const onSetSelect = React.useCallback(
    value =>
      dispatch({
        type: SELECT_SET,
        payload: value
      }),
    [dispatch]
  );

  const defaultSelectPrevious = usePrevious(defaultSelect);

  React.useEffect(() => {
    if (!isEqual(defaultSelect, defaultSelectPrevious)) {
      onSetSelect(defaultSelect);
    }
  }, [defaultSelectPrevious, defaultSelect, onSetSelect]);

  return (
    <SelectContext.Provider
      value={{
        selectState: {
          ...state,
          allSelected: isAll(
            data.nodes.map(item => item.id),
            state.ids
          ),
          noneSelected: !state.ids.length
        },

        onAddSelectById,
        onRemoveSelectById,
        onToggleSelectById,

        onAddSelectByIdRecursively,
        onRemoveSelectByIdRecursively,
        onToggleSelectByIdRecursively,

        onToggleSelectAll
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
