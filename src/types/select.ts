import * as React from 'react';

import { State, IdReducerFunctions } from '@table-library/react-table-library/types/common';
import { TableNode, GetRowProps } from '@table-library/react-table-library/types/table';

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

export type CellSelectProps<T extends TableNode> = {
  item: T;
};

type ColumnSelectPropsObject = {
  renderHeaderCellSelect?: () => React.ReactNode;
  renderCellSelect?: (node: TableNode) => React.ReactNode;
};

export type ColumnSelectProps = ColumnSelectPropsObject | boolean;

export type Select<T extends TableNode> = {
  state: State;
  fns: IdReducerFunctions;
  options: SelectOptionsSound;
  _getRowProps: GetRowProps<T>;
  components: {
    HeaderCellSelect: React.FunctionComponent<Record<string, any>>;
    CellSelect: React.FunctionComponent<CellSelectProps<T>>;
  };
};
