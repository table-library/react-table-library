import * as React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import cs from 'classnames';

import IconChevronSingleDown from '@icons/IconChevronSingleDown';
import IconChevronSingleRight from '@icons/IconChevronSingleRight';
import { getIcon } from '@util/getIcon';
import { Button } from '@shared/Button';
import { CellContainer } from '@shared/Cell';
import { ThemeContext } from '@context/Theme';
import { TreeContext } from '@context/Tree';

import { isLeaf } from '../util';

const TREE_ICON_SIZE = '14px';
const TREE_ICON_MARGIN = '4px';

const TreeButton = styled(Button)`
  width: auto;
`;

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
  ({
    item,
    treeIcon = {},
    width,
    className,
    indentation,
    children
  }) => {
    const theme = React.useContext(ThemeContext);
    const { treeState, onTreeExpandById } = React.useContext(
      TreeContext
    );

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

      onTreeExpandById(item.id);
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
      <CellContainer
        role="gridcell"
        className={cs('td', 'cell-tree', className)}
        css={theme?.Cell}
        width={width}
        indentation={indentation}
      >
        <TreeContent>
          <TreeButton
            className="prefix"
            margin={treeIconMargin}
            onClick={handleClick}
          >
            <span>{icon}</span>
          </TreeButton>
          <div>{children}</div>
        </TreeContent>
      </CellContainer>
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
  width: PropTypes.string,
  className: PropTypes.string,
  indentation: PropTypes.number,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func
  ])
};

export { CellTree };
