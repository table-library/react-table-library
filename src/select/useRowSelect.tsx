import * as React from 'react';
import cs from 'clsx';

import * as COLORS from '@table-library/react-table-library/common/colors';
import { isRowClick } from '@table-library/react-table-library/common/util/isRowClick';
import { useIdReducer } from '@table-library/react-table-library/common/util/useIdReducer';
import { useSyncRefState } from '@table-library/react-table-library/common/util/useSyncRefState';
import { applyModifiers } from '@table-library/react-table-library/common/util/modifiers';

import { State, StateAndChange } from '@table-library/react-table-library/types/common';
import {
  Data,
  TableNode,
  Features,
  FeatureProps,
  RowProps,
} from '@table-library/react-table-library/types/table';
import {
  Select,
  SelectOptions,
  SelectTypes,
  SelectClickTypes,
} from '@table-library/react-table-library/types/select';

import { HeaderCellSelect } from './HeaderCellSelect';
import { CellSelect } from './CellSelect';

const getRowProps = <T extends TableNode>(
  props: RowProps<T>,
  features: Features<T>,
): FeatureProps<T> => {
  const { item } = props;

  const { select } = features;

  if (!select) {
    throw new Error("No 'select' in getRowProps. That's odd");
  }

  const isMultiSelected = select.state.ids.includes(item.id);
  const isSingleSelect = select.state.id === item.id;

  const theme = `
    &.row-select-selected,
    &.row-select-single-selected {
      font-weight: bold;

      background-color: ${COLORS.ROW_SELECTED};
    }

    &.row-select-clickable {
      cursor: pointer;
    }
  `;

  const className = cs('row-select', {
    'row-select-clickable': select.options.clickType === SelectClickTypes.RowClick,
    'row-select-selected': isMultiSelected,
    'row-select-single-selected': isSingleSelect,
  });

  const onClick = (node: TableNode, event: React.SyntheticEvent | React.KeyboardEvent) => {
    if (!isRowClick(event)) return;
    if (select.options.clickType !== SelectClickTypes.RowClick) return;

    const hasMultiSelectType =
      select.options.rowSelect === SelectTypes.MultiSelect ||
      select.options.buttonSelect === SelectTypes.MultiSelect;

    const isMultiSelectType = select.options.rowSelect === SelectTypes.MultiSelect;

    // optional ways to activate multi-select with keyboard
    const isCommandSelectType = !!(event as any).metaKey;
    const isShiftSelectType = !!(event as any).shiftKey;

    if (isCommandSelectType && hasMultiSelectType) {
      select.fns.onToggleById(node.id);
    } else if (isShiftSelectType && hasMultiSelectType) {
      select.fns.onToggleByIdShift(node.id, select.options, applyModifiers(features));
    } else if (isMultiSelectType) {
      select.fns.onToggleById(node.id);
    } /* isSingleSelectType */ else if (select.options.enforceHasSelection) {
      select.fns.onAddByIdExclusively(node.id);
    } else {
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

const DEFAULT_STATE_ENFORCE_HAS_SELECTION = {
  ids: [],
  id: '0',
};

const DEFAULT_OPTIONS = {
  clickType: SelectClickTypes.RowClick,
  rowSelect: SelectTypes.SingleSelect,
  buttonSelect: SelectTypes.MultiSelect,
  isCarryForward: true,
  isPartialToAll: false,
  enforceHasSelection: false,
};

const useRowSelect = <T extends TableNode>(
  data: Data<T>,
  primary?: StateAndChange,
  options?: SelectOptions,
  context?: any,
): Select<T> => {
  const mergedOptions = {
    ...DEFAULT_OPTIONS,
    ...(options ?? {}),
  };

  const controlledState: State = {
    ...(mergedOptions.enforceHasSelection ? DEFAULT_STATE_ENFORCE_HAS_SELECTION : DEFAULT_STATE),
    ...(primary?.state ?? {}),
  };

  const onChange = primary?.onChange ? primary.onChange : () => {};

  const [state, fns] = useIdReducer<T>(data, controlledState, onChange, context);

  useSyncRefState('select', context, state);

  return {
    state,
    fns,
    options: mergedOptions,
    _getRowProps: getRowProps,
    components: {
      HeaderCellSelect,
      CellSelect,
    },
  };
};

export { useRowSelect };
