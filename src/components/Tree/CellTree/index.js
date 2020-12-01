import * as React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import cs from 'classnames';

import IconChevronSingleDown from '@icons/IconChevronSingleDown';
import IconChevronSingleRight from '@icons/IconChevronSingleRight';
import { Button, CellContainer } from '@shared';
import { ThemeContext, TreeContext } from '@context';

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

const CellTree = React.memo(
  ({ item, width, className, indentation, children }) => {
    const theme = React.useContext(ThemeContext);
    const { treeState, onTreeById } = React.useContext(TreeContext);

    const handleClick = () => {
      if (isLeaf(item)) return;

      onTreeById(item.id);
    };

    const isTreeed = treeState.ids.includes(item.id);

    let icon = null;

    if (isLeaf(item)) {
      icon = null;
    } else if (!isLeaf(item) && isTreeed) {
      icon = (
        <IconChevronSingleDown
          height={TREE_ICON_SIZE}
          width={TREE_ICON_SIZE}
        />
      );
    } else if (!isLeaf(item) && !isTreeed) {
      icon = (
        <IconChevronSingleRight
          height={TREE_ICON_SIZE}
          width={TREE_ICON_SIZE}
        />
      );
    }

    return (
      <CellContainer
        className={cs('td', 'cell-tree', className)}
        css={theme?.Cell}
        width={width}
        indentation={indentation}
      >
        <TreeContent>
          <TreeButton
            className={cs('prefix', {
              active: isTreeed
            })}
            margin={TREE_ICON_MARGIN}
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
