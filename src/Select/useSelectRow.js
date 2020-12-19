import { css } from 'styled-components';
import cs from 'classnames';

import { isRowClick } from '@common/util/isRowClick';
import * as COLORS from '@common/colors';

import { SELECT_TYPES } from './config';

const useSelectRow = ({
  // state
  isSelected,
  onToggleSelectById,
  // options
  selectType = SELECT_TYPES.RowClick
}) => {
  const theme = css`
    &.row-select-selected {
      color: ${COLORS.FONT_PRIMARY};
      font-weight: bold;

      background-color: ${COLORS.ROW_SELECTED};
    }

    &.row-select-clickable {
      cursor: pointer;
    }
  `;

  const className = cs('row-select', {
    'row-select-clickable': selectType === SELECT_TYPES.RowClick,
    'row-select-selected': isSelected
  });

  const onClick = (tableItem, event) => {
    if (!isRowClick(event)) return;

    if (selectType === SELECT_TYPES.RowClick) {
      onToggleSelectById(tableItem.id);
    }
  };

  return {
    name: 'selectPlugin',
    theme,
    className,
    onClick
  };
};

export { useSelectRow };
