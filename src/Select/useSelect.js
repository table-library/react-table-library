import { css } from 'styled-components';
import cs from 'classnames';

import * as COLORS from '@common/colors';
import { isRowClick } from '@common/util/isRowClick';
import { useCommonReducer } from '@common/util/useCommonReducer';

import { SELECT_TYPES } from './config';

const getRowProps = (item, { select }) => {
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
    'row-select-clickable':
      select.options.selectType === SELECT_TYPES.RowClick,
    'row-select-selected': select.state.ids.includes(item.id)
  });

  const onClick = (tableItem, event) => {
    if (!isRowClick(event)) return;

    if (select.options.selectType === SELECT_TYPES.RowClick) {
      select.fns.onToggleById(tableItem.id);
    }
  };

  return {
    name: 'select',
    theme,
    className,
    onClick
  };
};

const DEFAULT_STATE = {
  ids: []
};

const DEFAULT_OPTIONS = {
  selectType: SELECT_TYPES.RowClick
};

const useSelect = (
  { data, initialState = DEFAULT_STATE, onChange },
  options = {}
) => {
  const [state, fns] = useCommonReducer(data, initialState, onChange);

  const mergedOptions = {
    ...DEFAULT_OPTIONS,
    ...options
  };

  const tableProps = {
    select: { state, fns, options: mergedOptions, getRowProps }
  };

  return [state, fns, tableProps];
};

export { useSelect };
