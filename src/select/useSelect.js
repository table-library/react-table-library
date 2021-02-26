import { css } from 'styled-components';
import cs from 'classnames';

import * as COLORS from '@table-library/react-table-library/lib/common/colors';
import { isRowClick } from '@table-library/react-table-library/lib/common/util/isRowClick';
import { useCommonReducer } from '@table-library/react-table-library/lib/common/util/useCommonReducer';

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
    'row-select-selected': isSelected,
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
    panels: [],
  };
};

const DEFAULT_STATE = {
  ids: [],
};

const DEFAULT_OPTIONS = {
  selectType: SELECT_TYPES.RowClick,
};

const useSelect = (primary = {}, options = {}) => {
  const data = primary.data || undefined;
  const incomingState = primary.state || DEFAULT_STATE;
  const onChange = primary.onChange || (() => {});

  const [state, fns] = useCommonReducer(
    data,
    incomingState,
    onChange
  );

  const mergedOptions = {
    ...DEFAULT_OPTIONS,
    ...options,
  };

  return {
    state,
    fns,
    _options: mergedOptions,
    _getRowProps: getRowProps,
  };
};

export { useSelect };
