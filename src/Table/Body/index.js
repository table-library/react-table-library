import * as React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { TableContext } from '@common/context/Table';
import { ThemeContext } from '@common/context/Theme';
import { SelectContext } from '@common/context/Select';
import { TreeContext } from '@common/context/Tree';
import { ExpandContext } from '@common/context/Expand';
import { FetchContext } from '@common/context/Fetch';

const BodyContainer = styled.div`
  ${({ css }) => css};
`;

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

const getCommonProps = child => ({
  id: child.props.item.id
});

const getSelectProps = (
  child,
  { selectState, onToggleSelectById, onToggleSelectByIdRecursively }
) => ({
  isSelected: selectState.ids.includes(child.props.item.id),
  onToggleSelectById,
  onToggleSelectByIdRecursively
});

const getTreeProps = (
  child,
  { treeState, onToggleTreeExpandById }
) => ({
  isTreeExpanded: treeState.ids.includes(child.props.item.id),
  onToggleTreeExpandById
});

const getExpandProps = (
  child,
  { expandState, onToggleExpandById }
) => ({
  isExpanded: expandState.ids.includes(child.props.item.id),
  onToggleExpandById
});

const getFetchProps = (
  child,
  { fetchState, onAddFetchById, onRemoveFetchById }
) => ({
  isFetching: fetchState.ids.includes(child.props.item.id),
  onAddFetchById,
  onRemoveFetchById
});

const Body = ({ children }) => {
  const size = React.Children.count(children);

  const { data, tableFeatureRef } = React.useContext(TableContext);

  const theme = React.useContext(ThemeContext);
  const select = React.useContext(SelectContext);
  const tree = React.useContext(TreeContext);
  const expand = React.useContext(ExpandContext);
  const fetching = React.useContext(FetchContext);

  return (
    <BodyContainer
      role="rowgroup"
      className="tbody"
      css={theme?.Body}
    >
      {React.Children.map(children, (child, index) =>
        React.cloneElement(child, {
          tableState: tableFeatureRef.current,
          parentItem: getParentItem(data, child.props.item.id),
          firstRow: index === 0,
          lastRow: size === index + 1,
          ...getCommonProps(child),
          ...getSelectProps(child, select),
          ...getTreeProps(child, tree),
          ...getExpandProps(child, expand),
          ...getFetchProps(child, fetching)
        })
      )}
    </BodyContainer>
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
