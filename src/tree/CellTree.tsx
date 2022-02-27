import * as React from 'react';
import { styled } from '@stitches/react';

import { Button } from '@table-library/react-table-library/common/components/Button';
import { Cell } from '@table-library/react-table-library/table/Cell';
import { TreeContext } from '@table-library/react-table-library/common/context/Tree';
import { isLeaf } from '@table-library/react-table-library/common/util/tree';

import { Nullish, State } from '@table-library/react-table-library/types/common';
import { TableNode } from '@table-library/react-table-library/types/table';
import { CellTreeProps } from '@table-library/react-table-library/types/tree';

const BaseCellTree = styled('div', {
  display: 'flex',
  alignItems: 'center',

  '& > div': {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
});

const getTreeIcon = (
  item: TableNode,
  treeState: State,
  treeIconSize: string,
  TreeIconDefault: React.ReactElement | Nullish,
  TreeIconRight: React.ReactElement | Nullish,
  TreeIconDown: React.ReactElement | Nullish,
) => {
  const size = {
    height: `${treeIconSize}`,
    width: `${treeIconSize}`,
  };

  const isTreeExpanded = treeState.ids.includes(item.id);

  if (!isLeaf(item) && isTreeExpanded) {
    return TreeIconDown ? React.cloneElement(TreeIconDown, { ...size }) : null;
  }

  if (!isLeaf(item) && !isTreeExpanded) {
    return TreeIconRight ? React.cloneElement(TreeIconRight, { ...size }) : null;
  }

  return TreeIconDefault ? React.cloneElement(TreeIconDefault, { ...size }) : null;
};

export const CellTree: React.FC<CellTreeProps> = ({
  item,
  treeIcon = {},
  children,
  ...passThrough
}: CellTreeProps) => {
  const context = React.useContext(TreeContext);

  if (!context) {
    throw new Error('No Tree Context. No return value from useTree provided to Table component.');
  }

  const { state, fns, options } = context;

  const mergedTreeIconOptions = {
    ...options.treeIcon,
    ...treeIcon,
  };

  const handleClick = () => {
    if (isLeaf(item)) return;

    fns.onToggleById(item.id);
  };

  const icon = getTreeIcon(
    item,
    state,
    mergedTreeIconOptions.size,
    mergedTreeIconOptions.iconDefault,
    mergedTreeIconOptions.iconRight,
    mergedTreeIconOptions.iconDown,
  );

  return (
    <Cell {...passThrough}>
      <BaseCellTree>
        <Button
          className="prefix narrow"
          margin={icon ? mergedTreeIconOptions.margin : mergedTreeIconOptions.noIconMargin}
          onClick={handleClick}
        >
          {icon ? <span>{icon}</span> : <span />}
        </Button>
        <div>{children}</div>
      </BaseCellTree>
    </Cell>
  );
};
