import * as React from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash.isequal';

import { usePrevious } from '@util/usePrevious';

import { SelectContext } from './Select';
import { TreeContext } from './Tree';
import { ExpandContext } from './Expand';
import { SortContext } from './Sort';

const StateListener = ({ onTableStateChange }) => {
  const select = React.useContext(SelectContext);
  const tree = React.useContext(TreeContext);
  const expand = React.useContext(ExpandContext);
  const sort = React.useContext(SortContext);

  const tableState = React.useMemo(
    () => ({
      select,
      tree,
      expand,
      sort
    }),
    [select, tree, expand, sort]
  );

  const featureState = React.useMemo(
    () => ({
      SELECT: select.selectState,
      TREE: tree.treeState,
      EXPAND: expand.expandState,
      SORT: sort.sortState
    }),
    [select, tree, expand, sort]
  );

  const featureStatePrev = usePrevious(featureState);

  const isMount = React.useRef(false);

  React.useEffect(() => {
    // callback with an initial table state
    if (!isMount.current) {
      isMount.current = true;

      onTableStateChange('INIT', tableState);
    }

    // callback with every feature state change
    if (!isMount.current) {
      Object.keys(featureState).forEach(key => {
        const dependencyChanged =
          featureStatePrev &&
          !isEqual(featureState[key], featureStatePrev[key]);

        if (dependencyChanged) {
          const type = key;
          onTableStateChange(type, tableState);
        }
      });
    }
  }, [
    featureState,
    featureStatePrev,
    onTableStateChange,
    tableState
  ]);

  return null;
};

StateListener.propTypes = {
  onTableStateChange: PropTypes.func
};

export { StateListener };
