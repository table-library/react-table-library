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

export type MiddlewareFunction = (action: Action | Nullish, state: State, context: any) => void;

export type StateAndChange = {
  state: State;
  onChange: MiddlewareFunction;
};

export type Modifier = (nodes: any[]) => any[];

type IdReducerFunctionsOptions = {
  isCarryForward?: boolean;
  isPartialToAll?: boolean;
} & Record<string, any>;

export type IdReducerFunctions = {
  onAddById: (id: string) => void;
  onRemoveById: (id: string) => void;
  onToggleById: (id: string) => void;

  onAddByIdRecursively: (ids: string[], options: IdReducerFunctionsOptions) => void;
  onRemoveByIdRecursively: (ids: string[]) => void;
  onToggleByIdRecursively: (id: string, options: IdReducerFunctionsOptions) => void;

  onAddByIdExclusively: (id: string) => void;
  onRemoveByIdExclusively: () => void;
  onToggleByIdExclusively: (id: string) => void;

  onToggleByIdShift: (id: string, options: IdReducerFunctionsOptions, modifier: Modifier) => void;

  onAddAll: (ids: string[]) => void;
  onRemoveAll: () => void;
  onToggleAll: (options: IdReducerFunctionsOptions) => void;
};
