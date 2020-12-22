import * as React from 'react';
import PropTypes from 'prop-types';

import { TableContext } from '@common/context/Table';
import { SelectContext } from '@common/context/Select';
import { TreeContext } from '@common/context/Tree';
import { ExpandContext } from '@common/context/Expand';
import { FetchContext } from '@common/context/Fetch';

const findParentItem = (rootItem, id) =>
  rootItem.nodes.reduce((acc, value) => {
    if (acc) return acc;

    if (value.nodes?.map(node => node.id).includes(id)) {
      return value;
    }

    if (value.nodes) {
      return findParentItem(value, id);
    }

    return acc;
  }, null);

const getParentItem = (rootItem, id) =>
  findParentItem(rootItem, id) || rootItem;

const getSelectProps = (
  child,
  { selectState, onToggleById, onToggleByIdRecursively }
) => ({
  isSelected: selectState.ids.includes(child.props.item.id),
  onToggleById,
  onToggleByIdRecursively
});

const getTreeProps = (child, { treeState, onToggleById }) => ({
  isTreeExpanded: treeState.ids.includes(child.props.item.id),
  onToggleById
});

const getExpandProps = (child, { expandState, onToggleById }) => ({
  isExpanded: expandState.ids.includes(child.props.item.id),
  onToggleById
});

const getFetchProps = (
  child,
  { fetchState, onAddById, onRemoveById }
) => ({
  isFetching: fetchState.ids.includes(child.props.item.id),
  onAddById,
  onRemoveById
});

const Body = ({ children }) => {
  const size = React.Children.count(children);

  const { data, tableFeatureRef } = React.useContext(TableContext);

  const select = React.useContext(SelectContext);
  const tree = React.useContext(TreeContext);
  const expand = React.useContext(ExpandContext);
  const fetching = React.useContext(FetchContext);

  return (
    <>
      {React.Children.map(children, (child, index) =>
        React.cloneElement(child, {
          tableState: tableFeatureRef.current,

          parentItem: getParentItem(data, child.props.item.id),
          firstRow: index === 0,
          lastRow: size === index + 1,
          id: child.props.item.id,

          select: getSelectProps(child, select),
          tree: getTreeProps(child, tree),
          expand: getExpandProps(child, expand),
          fetching: getFetchProps(child, fetching)
        })
      )}
    </>
  );
};

Body.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func
  ])
};

export { Body };
