import * as React from 'react';
/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';

import { Button } from '@overmap-ai/react-table-library/common/components/Button';
import { Cell } from '@overmap-ai/react-table-library/table/Cell';
import { useTreeContext } from '@overmap-ai/react-table-library/common/context/Tree';
import { isLeaf } from '@overmap-ai/react-table-library/common/util/tree';

import { State } from '@overmap-ai/react-table-library/types/common';
import { TableNode } from '@overmap-ai/react-table-library/types/table';
import { CellTreeProps, CustomIcon } from '@overmap-ai/react-table-library/types/tree';

const style = css`
  display: flex;
  align-items: center;

  & > div {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export type Size = {
  height: string;
  width: string;
};

const resolveIcon = <T extends TableNode>(customIcon: CustomIcon<T>, node: T, size: Size) => {
  if (!customIcon) return null;

  if (typeof customIcon === 'function') {
    return React.cloneElement(customIcon(node), { ...size });
  }

  return React.cloneElement(customIcon, { ...size });
};

const getTreeIcon = <T extends TableNode>(
  item: T,
  treeState: State,
  treeIconSize: string,
  TreeIconDefault: CustomIcon<T>,
  TreeIconRight: CustomIcon<T>,
  TreeIconDown: CustomIcon<T>,
) => {
  const size = {
    height: `${treeIconSize}`,
    width: `${treeIconSize}`,
  };

  const isTreeExpanded = treeState.ids.includes(item.id);

  if (!isLeaf(item) && isTreeExpanded) {
    return resolveIcon<T>(TreeIconDown, item, size);
  }

  if (!isLeaf(item) && !isTreeExpanded) {
    return resolveIcon<T>(TreeIconRight, item, size);
  }

  return resolveIcon<T>(TreeIconDefault, item, size);
};

export const CellTree = <T extends TableNode>({
  item,
  treeIcon = {},
  children,
  ...passThrough
}: CellTreeProps<T>) => {
  const context = useTreeContext<T>();

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

  const icon = getTreeIcon<T>(
    item,
    state,
    mergedTreeIconOptions.size,
    mergedTreeIconOptions.iconDefault,
    mergedTreeIconOptions.iconRight,
    mergedTreeIconOptions.iconDown,
  );

  return (
    <Cell {...passThrough}>
      <div css={style}>
        <Button
          className="prefix narrow no-shrink"
          margin={icon ? mergedTreeIconOptions.margin : mergedTreeIconOptions.noIconMargin}
          onClick={handleClick}
        >
          {icon ? <div>{icon}</div> : <div />}
        </Button>
        <div>{children}</div>
      </div>
    </Cell>
  );
};
