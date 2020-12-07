import * as React from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash.isequal';

import { usePrevious } from '@util/usePrevious';

import { SelectContext } from './Select';
import { TreeContext } from './Tree';
import { ExpandContext } from './Expand';
import { SortContext } from './Sort';

const StateListener = ({ tableStateChange }) => {
  const select = React.useContext(SelectContext);
  const tree = React.useContext(TreeContext);
  const expand = React.useContext(ExpandContext);
  const sort = React.useContext(SortContext);

  const tableState = {
    select,
    tree,
    expand,
    sort
  };

  const selectStatePrev = usePrevious(select.selectState);
  const treeStatePrev = usePrevious(tree.treeState);
  const expandStatePrev = usePrevious(expand.expandState);
  const sortStatePrev = usePrevious(sort.sortState);

  const isMount = React.useRef(false);

  React.useEffect(() => {
    if (!isMount.current && !tableStateChange.notifyOnMount) {
      isMount.current = true;
      return;
    }

    if (!isEqual(selectStatePrev, select.selectState)) {
      tableStateChange.onTableStateChange('SELECT', tableState);
    }

    if (!isEqual(treeStatePrev, tree.treeState)) {
      tableStateChange.onTableStateChange('TREE', tableState);
    }

    if (!isEqual(expandStatePrev, expand.expandState)) {
      tableStateChange.onTableStateChange('EXPAND', tableState);
    }

    if (!isEqual(sortStatePrev, sort.sortState)) {
      tableStateChange.onTableStateChange('SORT', tableState);
    }
  }, [
    expand,
    expandStatePrev,
    select,
    selectStatePrev,
    sort,
    sortStatePrev,
    tableState,
    tableStateChange,
    tree,
    treeStatePrev
  ]);

  return null;
};

StateListener.propTypes = {
  tableStateChange: PropTypes.shape({
    notifyOnMount: PropTypes.bool,
    onTableStateChange: PropTypes.func
  })
};

export { StateListener };
