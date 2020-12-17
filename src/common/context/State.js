import * as React from 'react';
import isEqual from 'lodash.isequal';

import { usePrevious } from '@common/util/usePrevious';

import { TableContext } from './Table';
import { ThemeContext } from './Theme';
import { ResizeContext } from './Resize';
import { SelectContext } from './Select';
import { TreeContext } from './Tree';
import { ExpandContext } from './Expand';
import { FetchContext } from './Fetch';
import { SortContext } from './Sort';

const checkConflicts = externalTableState => {
  const INTERNAL_KEYS = [
    'theme',
    'resize',
    'select',
    'tree',
    'expand',
    'sort',
    'fetch'
  ];

  Object.keys(externalTableState).forEach(key => {
    if (INTERNAL_KEYS.includes(key)) {
      const error = `There is an externalTableState key "${key}" which is already used by tableState. Please use another key.`;
      throw new Error(error);
    }
  });
};

const State = ({ externalTableState }) => {
  const {
    list,
    onTableStateChange,
    tableFeatureRef
  } = React.useContext(TableContext);

  const theme = React.useContext(ThemeContext);
  const resize = React.useContext(ResizeContext);
  const select = React.useContext(SelectContext);
  const tree = React.useContext(TreeContext);
  const expand = React.useContext(ExpandContext);
  const fetch = React.useContext(FetchContext);
  const sort = React.useContext(SortContext);

  const isMount = React.useRef(false);

  React.useEffect(() => {
    if (externalTableState) {
      checkConflicts(externalTableState);
    }

    tableFeatureRef.current = {
      list,
      theme,
      resize,
      select,
      tree,
      expand,
      fetch,
      sort,
      ...externalTableState
    };

    if (!isMount.current && onTableStateChange) {
      onTableStateChange('init', tableFeatureRef.current, {});
    }

    isMount.current = true;
  }, [
    externalTableState,
    tableFeatureRef,
    list,
    theme,
    resize,
    select,
    tree,
    expand,
    fetch,
    sort,
    onTableStateChange
  ]);

  const externalTableStatePrev = usePrevious(externalTableState);

  React.useEffect(() => {
    if (!externalTableStatePrev) return;

    Object.keys(externalTableState).forEach(key => {
      if (
        externalTableStatePrev[key] &&
        !isEqual(externalTableState[key], externalTableStatePrev[key])
      ) {
        onTableStateChange(key, tableFeatureRef.current);
      }
    });
  }, [
    tableFeatureRef,
    externalTableState,
    externalTableStatePrev,
    onTableStateChange
  ]);

  return null;
};

export { State };
