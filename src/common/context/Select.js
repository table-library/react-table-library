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

const ADD_BY_ID = 'ADD_BY_ID';
const REMOVE_BY_ID = 'REMOVE_BY_ID';
const ADD_BY_ID_RECURSIVELY = 'ADD_BY_ID_RECURSIVELY';
const REMOVE_BY_ID_RECURSIVELY = 'REMOVE_BY_ID_RECURSIVELY';
const ADD_ALL = 'ADD_ALL';
const REMOVE_ALL = 'REMOVE_ALL';
const SET = 'SET';

const selectReducer = (state, action) => {
  switch (action.type) {
    case ADD_BY_ID: {
      return addById(state, action);
    }
    case REMOVE_BY_ID: {
      return removeById(state, action);
    }
    case ADD_BY_ID_RECURSIVELY: {
      return addByIds(state, action);
    }
    case REMOVE_BY_ID_RECURSIVELY: {
      return removeByIds(state, action);
    }
    case ADD_ALL: {
      return addAll(state, action);
    }
    case REMOVE_ALL: {
      return removeAll(state, action);
    }
    case SET: {
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

  const onAddById = React.useCallback(
    id =>
      dispatch({
        type: ADD_BY_ID,
        payload: { id }
      }),
    [dispatch]
  );

  const onRemoveById = React.useCallback(
    id =>
      dispatch({
        type: REMOVE_BY_ID,
        payload: { id }
      }),
    [dispatch]
  );

  const onToggleById = React.useCallback(
    id => (state.ids.includes(id) ? onRemoveById(id) : onAddById(id)),
    [state, onAddById, onRemoveById]
  );

  const onAddByIdRecursively = React.useCallback(
    ids => {
      dispatch({
        type: ADD_BY_ID_RECURSIVELY,
        payload: { ids }
      });
    },
    [dispatch]
  );

  const onRemoveByIdRecursively = React.useCallback(
    ids => {
      dispatch({
        type: REMOVE_BY_ID_RECURSIVELY,
        payload: { ids }
      });
    },
    [dispatch]
  );

  const onToggleByIdRecursively = React.useCallback(
    id => {
      const ids = findItemsById(data.nodes, id).map(item => item.id);

      if (isAll(ids, state.ids)) {
        onRemoveByIdRecursively(ids);
      } else {
        onAddByIdRecursively(ids);
      }
    },
    [data, state, onAddByIdRecursively, onRemoveByIdRecursively]
  );

  const onAddAll = React.useCallback(
    ids => {
      dispatch({
        type: ADD_ALL,
        payload: { ids }
      });
    },
    [dispatch]
  );

  const onRemoveAll = React.useCallback(() => {
    dispatch({
      type: REMOVE_ALL
    });
  }, [dispatch]);

  const onToggleAll = React.useCallback(() => {
    const ids = findAllItems(data.nodes).map(item => item.id);

    if (isAll(ids, state.ids)) {
      onRemoveAll();
    } else {
      onAddAll(ids);
    }
  }, [data, state, onAddAll, onRemoveAll]);

  const onSet = React.useCallback(
    value =>
      dispatch({
        type: SET,
        payload: value
      }),
    [dispatch]
  );

  const defaultSelectPrevious = usePrevious(defaultSelect);

  React.useEffect(() => {
    if (!isEqual(defaultSelect, defaultSelectPrevious)) {
      onSet(defaultSelect);
    }
  }, [defaultSelectPrevious, defaultSelect, onSet]);

  const none = !state.ids.length;

  const all = isAll(
    data.nodes.map(item => item.id),
    state.ids
  );

  return (
    <SelectContext.Provider
      value={{
        selectState: {
          ...state,
          all,
          none
        },

        onAddById,
        onRemoveById,
        onToggleById,

        onAddByIdRecursively,
        onRemoveByIdRecursively,
        onToggleByIdRecursively,

        onToggleAll
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
