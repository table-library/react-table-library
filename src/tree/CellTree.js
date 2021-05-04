import * as React from 'react';
import PropTypes from 'prop-types';

import { Button } from '@table-library/react-table-library/common/components/Button';
import { Cell } from '@table-library/react-table-library/table/Cell';
import { TreeContext } from '@table-library/react-table-library/common/context/Tree';
import { isLeaf } from '@table-library/react-table-library/common/util/tree';

const style = () => `
  display: flex;
  align-items: center;

  & > div {
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
    width: `${treeIconSize}`,
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
  ({ item, treeIcon = {}, children, ...passThrough }) => {
    const { state, fns, _options } = React.useContext(TreeContext);

    const mergedTreeIconOptions = {
      ..._options.treeIcon,
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
      mergedTreeIconOptions.iconDown
    );

    return (
      <Cell {...passThrough}>
        <div css={style()}>
          <Button
            className="prefix narrow"
            margin={mergedTreeIconOptions.margin}
            onClick={handleClick}
          >
            {icon && <span>{icon}</span>}
          </Button>
          <div>{children}</div>
        </div>
      </Cell>
    );
  }
);

CellTree.propTypes = {
  item: PropTypes.objectOf(PropTypes.any),
  treeIcon: PropTypes.shape({
    margin: PropTypes.string,
    size: PropTypes.string,
    iconDefault: PropTypes.node,
    iconRight: PropTypes.node,
    iconDown: PropTypes.node,
  }),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func,
  ]),
};

export { CellTree };
