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
  // state
  isExpanded,
  onToggleExpandById,
  // tree specific
  treeDepthLevel = 0,
  treeColumnLevel = 1
}) => {
  const theme = css`
    &.expandable-row {
      cursor: pointer;
    }
  `;

  const className = cs('row-expand', {
    'expandable-row': expandType === EXPAND_TYPES.RowClick,
    'expanded-row': isExpanded
  });

  const onClick = (tableItem, event) => {
    if (!isRowClick(event)) return;

    if (expandType === EXPAND_TYPES.RowClick) {
      onToggleExpandById(tableItem.id);
    }
  };

  return {
    name: 'expandPlugin',
    theme,
    className,
    onClick,
    expand: {
      expansionPanel: isExpanded
        ? expansionPanel(item, {
            treeDepthLevel,
            treeColumnLevel
          })
        : null
    }
  };
};

export { useExpandRow };
