import * as React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import cs from 'classnames';

import IconChevronSingleDown from '@common/icons/IconChevronSingleDown';
import IconChevronSingleRight from '@common/icons/IconChevronSingleRight';
import { getIcon } from '@common/util/getIcon';
import { Button } from '@common/components/Button';
import { Cell } from '@table-library/react-table-library/lib/table/Cell';
import { TreeContext } from '@common/context/Tree';

import { isLeaf } from './util';

const TREE_ICON_SIZE = '14px';
const TREE_ICON_MARGIN = '4px';

const TreeContent = styled.div`
  display: flex;
  align-items: center;

  & > div {
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const getTreeIcon = (
  item,
  treeState,
  treeIconSize,
  TreeIconDefault,
  TreeIconRight,
  TreeIconDown
) => {
  const size = {
    height: `${treeIconSize}`,
    width: `${treeIconSize}`
  };

  const isTreeExpanded = treeState.ids.includes(item.id);

  if (!isLeaf(item) && isTreeExpanded) {
    return TreeIconDown
      ? React.cloneElement(TreeIconDown, { ...size })
      : null;
  }

  if (!isLeaf(item) && !isTreeExpanded) {
    return TreeIconRight
      ? React.cloneElement(TreeIconRight, { ...size })
      : null;
  }

  return TreeIconDefault
    ? React.cloneElement(TreeIconDefault, { ...size })
    : null;
};

const CellTree = React.memo(
  ({ item, treeIcon = {}, className, children, ...passThrough }) => {
    const { treeState, onToggleById } = React.useContext(TreeContext);

    const treeIconSize = treeIcon.size || TREE_ICON_SIZE;
    const treeIconMargin = treeIcon.margin || TREE_ICON_MARGIN;
    const treeIconDefault = getIcon(treeIcon.iconDefault, null);
    const treeIconRight = getIcon(
      treeIcon.iconRight,
      <IconChevronSingleRight />
    );
    const treeIconDown = getIcon(
      treeIcon.iconDown,
      <IconChevronSingleDown />
    );

    const handleClick = () => {
      if (isLeaf(item)) return;

      onToggleById(item.id);
    };

    const icon = getTreeIcon(
      item,
      treeState,
      treeIconSize,
      treeIconDefault,
      treeIconRight,
      treeIconDown
    );

    return (
      <Cell className={cs('td-tree', className)} {...passThrough}>
        <TreeContent>
          <Button
            className="prefix narrow"
            margin={treeIconMargin}
            onClick={handleClick}
          >
            {icon && <span>{icon}</span>}
          </Button>
          <div>{children}</div>
        </TreeContent>
      </Cell>
    );
  }
);

CellTree.propTypes = {
  item: PropTypes.shape(PropTypes.any),
  treeIcon: PropTypes.shape({
    margin: PropTypes.string,
    size: PropTypes.string,
    iconDefault: PropTypes.node,
    iconRight: PropTypes.node,
    iconDown: PropTypes.node
  }),
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func
  ])
};

export { CellTree };
