import { ExtendedNode, TableNode } from './table';

export type Nullish = null | undefined;

export type Action = {
  type: string;
  payload?: any;
};

export type State = Record<string, any>;

export type IdState = {
  id?: string | Nullish;
  ids: string[];
  all?: boolean;
  none?: boolean;
} & State;

export type MiddlewareFunction = (action: Action, state: State, context: any) => void;

export type StateAndChange = {
  state?: State;
  onChange?: MiddlewareFunction;
};

export type Modifier = (nodes: TableNode[]) => TableNode[] | ExtendedNode<TableNode>[];

type IdReducerFunctionsOptions = {
  isCarryForward?: boolean;
  isPartialToAll?: boolean;
} & Record<string, any>;

export type IdReducerFunctions = {
  onAddById: (id: string) => void;
  onRemoveById: (id: string) => void;
  onToggleById: (id: string) => void;

  onAddByIds: (ids: string[], options: IdReducerFunctionsOptions) => void;
  onRemoveByIds: (ids: string[]) => void;
  onToggleByIdRecursively: (id: string, options: IdReducerFunctionsOptions) => void;

  onAddByIdRecursively: (id: string, options: IdReducerFunctionsOptions) => void;
  onRemoveByIdRecursively: (id: string) => void;

  onAddByIdExclusively: (id: string) => void;
  onRemoveByIdExclusively: () => void;
  onToggleByIdExclusively: (id: string) => void;

  onToggleByIdShift: (id: string, options: IdReducerFunctionsOptions, modifier: Modifier) => void;

  onAddAll: (ids: string[]) => void;
  onRemoveAll: () => void;
  onToggleAll: (options: IdReducerFunctionsOptions) => void;
};
