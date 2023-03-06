import { ExtendedNode, Identifier, TableNode } from './table';

export type Nullish = null | undefined;

export type Action = {
  type: string;
  payload?: any;
};

export type State = Record<string, any>;

export type IdState = {
  id?: Identifier | Nullish;
  ids: Identifier[];
  all?: boolean;
  none?: boolean;
} & State;

export type MiddlewareFunction = (action: Action, state: State, context: any) => void;

export type StateAndChange = {
  state?: State;
  onChange?: MiddlewareFunction;
};

export type Modifier<T extends TableNode> = (nodes: T[]) => ExtendedNode<T>[];

type IdReducerFunctionsOptions = {
  isCarryForward?: boolean;
  isPartialToAll?: boolean;
} & Record<string, any>;

export type IdReducerFunctions<T extends TableNode> = {
  onAddById: (id: Identifier) => void;
  onRemoveById: (id: Identifier) => void;
  onToggleById: (id: Identifier) => void;

  onAddByIds: (ids: Identifier[], options: IdReducerFunctionsOptions) => void;
  onRemoveByIds: (ids: Identifier[]) => void;
  onToggleByIdRecursively: (id: Identifier, options: IdReducerFunctionsOptions) => void;

  onAddByIdRecursively: (id: Identifier, options: IdReducerFunctionsOptions) => void;
  onRemoveByIdRecursively: (id: Identifier) => void;

  onAddByIdExclusively: (id: Identifier) => void;
  onRemoveByIdExclusively: () => void;
  onToggleByIdExclusively: (id: Identifier) => void;

  onToggleByIdShift: (
    id: Identifier,
    options: IdReducerFunctionsOptions,
    modifier: Modifier<T>,
  ) => void;

  onAddAll: (ids: Identifier[]) => void;
  onRemoveAll: () => void;
  onToggleAll: (options: IdReducerFunctionsOptions) => void;
};
