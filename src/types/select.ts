import { State, IdReducerFunctions } from '@table-library/react-table-library/types/common';
import { GetRowProps } from '@table-library/react-table-library/types/table';

export enum SelectClickTypes {
  RowClick,
  ButtonClick,
}

export enum SelectTypes {
  SingleSelect,
  MultiSelect,
}

export type SelectOptions = {
  clickType?: SelectClickTypes;
  rowSelect?: SelectTypes;
  buttonSelect?: SelectTypes;
  isCarryForward?: boolean;
  isPartialToAll?: boolean;
};

export type SelectOptionsSound = {
  clickType: SelectClickTypes;
  rowSelect: SelectTypes;
  buttonSelect: SelectTypes;
  isCarryForward: boolean;
  isPartialToAll: boolean;
};

export type Select = {
  state: State;
  fns: IdReducerFunctions;
  options: SelectOptionsSound;
  _getRowProps: GetRowProps;
};
