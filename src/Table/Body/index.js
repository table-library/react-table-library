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

const getCommonProps = child => ({
  id: child.props.item.id
});

const getSelectProps = (
  child,
  { selectState, onToggleSelectById }
) => ({
  isSelected: selectState.ids.includes(child.props.item.id),
  onToggleSelectById
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

  const { tableFeatureRef } = React.useContext(TableContext);

  const theme = React.useContext(ThemeContext);
  const select = React.useContext(SelectContext);
  const tree = React.useContext(TreeContext);
  const expand = React.useContext(ExpandContext);
  const fetche = React.useContext(FetchContext);

  return (
    <BodyContainer
      role="rowgroup"
      className="tbody"
      css={theme?.Body}
    >
      {React.Children.map(children, (child, index) =>
        React.cloneElement(child, {
          tableState: tableFeatureRef.current,
          firstRow: index === 0,
          lastRow: size === index + 1,
          ...getCommonProps(child),
          ...getSelectProps(child, select),
          ...getTreeProps(child, tree),
          ...getExpandProps(child, expand),
          ...getFetchProps(child, fetche)
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
