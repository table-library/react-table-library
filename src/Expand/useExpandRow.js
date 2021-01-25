import { css } from 'styled-components';
import cs from 'classnames';

import { isRowClick } from '@common/util/isRowClick';

import { EXPAND_TYPES } from './config';

const useExpandRow = ({
  // general
  item,
  // options
  expandType = EXPAND_TYPES.RowClick,
  expansionPanel,
  // context
  expand,
  // tree specific
  treeXLevel = 0,
  treeYLevel = 1
}) => {
  const theme = css`
    &.row-expand-clickable {
      cursor: pointer;
    }
  `;

  const className = cs('row-expand', {
    'row-expand-clickable': expandType === EXPAND_TYPES.RowClick,
    'row-expand-expanded': expand.isExpanded
  });

  const onClick = (tableItem, event) => {
    if (!isRowClick(event)) return;

    if (expandType === EXPAND_TYPES.RowClick) {
      expand.onToggleById(tableItem.id);
    }
  };

  return {
    name: 'expandPlugin',
    theme,
    className,
    onClick,
    expand: {
      expansionPanel: expand.isExpanded
        ? expansionPanel(item, {
            treeXLevel,
            treeYLevel
          })
        : null
    }
  };
};

export { useExpandRow };
