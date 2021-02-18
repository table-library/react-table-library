import { css } from 'styled-components';
import cs from 'classnames';

import * as COLORS from '@common/colors';
import { isRowClick } from '@common/util/isRowClick';
import { useCommonReducer } from '@common/util/useCommonReducer';

import { SELECT_TYPES } from './config';

const getRowProps = (props, features) => {
  const { item } = props;

  const { select } = features;

  const isSelected = select.state.ids.includes(item.id);

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
      select._options.selectType === SELECT_TYPES.RowClick,
    'row-select-selected': isSelected
  });

  const onClick = (tableItem, event) => {
    if (!isRowClick(event)) return;

    if (select._options.selectType === SELECT_TYPES.RowClick) {
      select.fns.onToggleById(tableItem.id);
    }
  };

  return {
    theme,
    className,
    onClick,
    panels: []
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

  return {
    state,
    fns,
    _options: mergedOptions,
    _getRowProps: getRowProps
  };
};

export { useSelect };
