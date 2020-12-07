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

  // const featureState = {
  //   select: select.selectState,
  //   tree: tree.treeState,
  //   expand: expand.expandState,
  //   sort: sort.sortState
  // };

  const selectStatePrev = usePrevious(select.selectState);
  const treeStatePrev = usePrevious(tree.treeState);
  const expandStatePrev = usePrevious(expand.expandState);
  const sortStatePrev = usePrevious(sort.sortState);

  const isMount = React.useRef(false);

  React.useEffect(() => {
    if (!isMount.current) {
      onTableStateChange('INIT', tableState);

      isMount.current = true;
      return;
    }

    if (!isEqual(selectStatePrev, select.selectState)) {
      onTableStateChange('SELECT', tableState);
    }

    if (!isEqual(treeStatePrev, tree.treeState)) {
      onTableStateChange('TREE', tableState);
    }

    if (!isEqual(expandStatePrev, expand.expandState)) {
      onTableStateChange('EXPAND', tableState);
    }

    if (!isEqual(sortStatePrev, sort.sortState)) {
      onTableStateChange('SORT', tableState);
    }
  }, [
    onTableStateChange,
    expand,
    expandStatePrev,
    select,
    selectStatePrev,
    sort,
    sortStatePrev,
    tableState,
    tree,
    treeStatePrev
  ]);

  return null;
};

StateListener.propTypes = {
  onTableStateChange: PropTypes.func
};

export { StateListener };
