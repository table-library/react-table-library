import cs from 'classnames';

import * as COLORS from '@table-library/react-table-library/common/colors';
import { isRowClick } from '@table-library/react-table-library/common/util/isRowClick';
import { useIdReducer } from '@table-library/react-table-library/common/util/useIdReducer';
import { useSyncRefState } from '@table-library/react-table-library/common/util/useSyncRefState';
import { applyModifiers } from '@table-library/react-table-library/common/util/modifiers';

import { SELECT_TYPES, SELECT_CLICK_TYPES } from './config';

const getRowProps = (props, features) => {
  const { item } = props;

  const { select } = features;

  const isMultiSelected = select.state.ids.includes(item.id);
  const isSingleSelect = select.state.id === item.id;

  const theme = `
    &.row-select-selected,
    &.row-select-single-selected {
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
      select._options.clickType === SELECT_CLICK_TYPES.RowClick,
    'row-select-selected': isMultiSelected,
    'row-select-single-selected': isSingleSelect,
  });

  const onClick = (node, event) => {
    if (!isRowClick(event)) return;

    if (select._options.clickType !== SELECT_CLICK_TYPES.RowClick)
      return;

    const isMultiSelectType =
      select._options.rowSelect === SELECT_TYPES.MultiSelect;

    // optional ways to activate multi-select with keyboard
    const isCommandSelectType = !!event.metaKey;
    const isShiftSelectType = !!event.shiftKey;

    const modifier = applyModifiers(features);

    if (isCommandSelectType) {
      select.fns.onToggleById(node.id);
    } else if (isShiftSelectType) {
      select.fns.onToggleByIdShift(
        node.id,
        select._options,
        modifier
      );
    } else if (isMultiSelectType) {
      select.fns.onToggleById(node.id);
    } /* isSingleSelectType */ else {
      select.fns.onToggleByIdExclusively(node.id);
    }
  };

  return {
    theme,
    className,
    onClick,
  };
};

const DEFAULT_STATE = {
  ids: [],
  id: null,
};

const DEFAULT_OPTIONS = {
  clickType: SELECT_CLICK_TYPES.RowClick,
  rowSelect: SELECT_TYPES.SingleSelect,
  buttonSelect: SELECT_TYPES.MultiSelect,
  isCarryForward: true,
  isPartialToAll: false,
};

const useRowSelect = (data, primary = {}, options = {}, context) => {
  const primaryNullFallback = primary || {};
  const controlledState = {
    ...DEFAULT_STATE,
    ...primaryNullFallback.state,
  };
  const onChange = primaryNullFallback.onChange || (() => {});

  const [state, fns] = useIdReducer(
    data,
    controlledState,
    onChange,
    context
  );

  useSyncRefState('select', context, state);

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

export { useRowSelect };
